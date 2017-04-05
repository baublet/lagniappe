# lagniappe

**lagniappe** (/ˈlænjæp/ lan-yap) is a framework written for [Electron](https://electron.atom.io). It aims to simplify developer operations by giving software teams a unified interface for complicated command line operations.

**Table of Contents**

* [What is it?](#what-is-it)
* [Install](#install)
* [Documentation](#documentation)
  * [Dependencies](#dependencies)
    * [I need root](#i-need-root)
    * [I don't have dependencies](#i-dont-have-dependencies)
  * [Commands](#commands)
    * [Example Command](#example-command)
    * [Command Window](#command-window)
    * [Multiple Commands](#multiple-commands)
    * [Command Sequence](#command-sequence)
  * [Watchers](#watchers)
    * [Example Watcher](#example-watcher)
* [User Interface](#user-interface)
  * [Sections](#sections)
    * [Navigation](#navigation)
    * [Routes](#routes)
  * [Layout Components](#layout-components)
  * [Spacing](#spacing)
    * [Customization](#customization)
* [Road Map](#road-map)
* [Credits](#credits)

## What is it?

DevOps is hard. There a ton of commands to remember, concerns about cross-platform availability, many software suites to install, people of different experience levels to address, and frequent pain points that make it often one of the most frustrating aspects of a development team.

This tool is designed to help teams consolidate the process of running local development environments by balling common commands into a cross-platform Electron application.

Developers and DevOps engineers can run the program from `yarn dev` so they can add new commands or adjust settings as necessary; the quality assurance team can run an auto-updating GUI customized for their needs; and the creative team can run their own custom staging environment.

## Install

At the moment, there are no build scripts. That is on the horizon. To start the application, you have to run the tool in dev mode. Fork this repo, clone it to your local machine, CD into the directory, and run `yarn && yarn dev` if you use Yarn, or `npm install && npm run dev` for NPM.

## Documentation

**Note:** A working knowledge of React, Redux, and Node are required to gain the most benefit from this framework.

At its core, this tool is merely a way to layout a React/Redux front end interacting with the user's native command-line environment via:

* Commands `app/commands`
    * Commands that spawn child processes and output the result to the command console.
    * Example: `docker-compose up`
* Watchers `app/watchers`
    * Commands spawning child processes whose output is *not* logged to a console window, but will instead be processed by the watcher function and then modify state.
    * Example: used to call `docker ps -a` and grep it for your application's running containers, then modifying the application's state to tell the user that the application is running.

Although you should know a fair bit of React and Redux to get the most out of this framework, it is possible to just use Watchers and Commands to do the bulk -- perhaps even all -- of what you need without writing additional action creators or reducers.

### Dependencies

Your development environment will probably require certain custom command line tools. To define your dependencies, locate the classes in the `app/dependencies` directory. In there, you can find a handful of examples. Dependency definition classes extend the base `app/dependencies/Dependency.js` class, and contain a constructor that looks like:

```js
import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Homebrew extends Dependency {

    constructor()
    {
        // Required
        super()

        // Name of this dependency for UI and logging purposes
        this.dependencyName = 'Homebrew'

        // The command to check whether or not this dependency is installed
        this.command = 'brew -v'

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /Homebrew/i

        // The commands required to install this dependency
        this.installationCommand = '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'

        // The commands required to uninstall this dependency
        this.uninstallCommand = 'curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall --output ./uninstall && chmod +x ./uninstall && ./uninstall -f && rm -rf ./uninstall'
    }

}
```

To define where in the chain of dependencies that class goes, add it to the dependecy array in `app/dependencies/index.js`:

```js
import Homebrew from './Homebrew'
import Git from './Git'
import Go from './Go'

// Add your dependencies here, IN THE PROPER ORDER! E.g., you probably can't
// install nginx on OSX easily without Homebrew, so Homebrew should go first.
const dependencies = [
    new Homebrew(),
    new Git(),
    new Go(),
]

...
```

#### I need root

If your dependency requires root, you will have to override the `install` and `uninstall` methods of the `Dependency.js` to use a library like (sudo-prompt)[https://github.com/jorangreef/sudo-prompt]. So your dependency may look like:

```js
import { exec } from 'sudo-prompt'

export default class Git extends Dependency {
    ...
    // Note, that this must return a promise!
    install() {
        return new Promise((resolve, reject) => {
            exec(this.installationCommand, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const success = error ? false : true
                resolve({
                    success,
                    error,
                    output: stdout + stderr
                })
            })
        })
    }
}
```

**Note:** Dependency `install` and `uninstall` methods must return a promise that resolves when the command is completed.

#### I don't have dependencies

No worries! You can totally remove the modal by removing the startup component, `<Startup />` in `/Users/rmpoe/Desktop/Development/dm-management/app/components/App.js`.

### Commands

Commands are classes that let you run asynchronous commands from the command line of the user's computer. They are configured to allow you to pipe the output to a command window with trivial effort. These commands are run in a different thread than the main Electron thread, and will not block your application's rendering.

They return promises, allowing you to chain commands in a sequence. Have a long string of commands to run one after the other? Check out the `CommandSequence` class for information on how to do that, or see the example below.

#### Example Command

This simple command logs the results of `git status` to the javascript console.

```js
// app/commands/GitStatus.js

import CommandProcess from './CommandProcess'

export default class GitStatus
{

    execute()
    {
        const command = {
            command: 'git',             // This behaves just like `git status` at the command line
            args: ['status']
        }
        const process = new CommandProcess(command, (data, error) => {
            console.log(data)
        })
        process.execute()
    }

}

//
// A method in some component.js
//

import GitStatus from 'app/commands/GitStatus.js'

...

    // Called, for example, when you click a button
    gitStatus() {
        const gitStatus = new GitStatus()
        gitStatus.execute()
    }

...
```

#### Command Window

The same command, but sending its contents to a command window in the lagniappe UI, rather than to the javascript console:

```js
// app/commands/GitStatus.js

import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class GitStatus
{

    execute()
    {
        const command = {
            command: 'git',
            args: ['status']
        }
        const window = new CommandWindow('Test Command')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
```

#### Multiple Commands

You can also execute multiple commands simultaneously:

```js
// app/commands/MultipleCommands.js
import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class Command
{

    execute()
    {
        const command = [
            {
                // Output from this channel will have "yahoo:" prepended
                id: 'yahoo',
                command: 'curl',
                args: ['yahoo.com']
            },
            {
                // Output from this channel will have "ls:" prepended
                id: 'ls',
                command: 'ls'
            },
            {
                // Output from this channel will have "google:" prepended
                id: 'google',
                command: 'curl',
                args: ['google.com']
            }
        ]
        const window = new CommandWindow('Multiple Commands')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
```

#### Command Sequence

You can string multiple commands together into a sequence using the `CommandSequence` class. This is very useful for creating efficient provisioning scripts, for example.

```js
// app/commands/GitCreateBranch.js
import CommandSequence from './CommandSequence'
import CommandWindow from './CommandWindow'

export default class GitCreateBranch
{
    execute(branchName)
    {
        const cwd = './appSource'
        const sequence = [
            { command: 'git', args: ['stash'], options: { cwd} },
            { command: 'git', args: ['checkout', 'master'], options: { cwd} },
            { command: 'git', args: ['reset', '--hard', 'origin/master'], options: { cwd} }
            { command: 'git', args: ['checkout', '-b', branchName], options: { cwd} }
        ]

        const window = new CommandWindow('New Branch: ' + branchName)
        const sequence = new CommandSequence(sequence, window.callback)

        return sequence.execute()
    }
}
```

You can also tap into the power of the `CommandProcess` class that spawns multiple processes if you pass in an array of commands to run a handful of commands; wait until they're all done executing; then continue on with the sequence.

```js
// app/commands/GitCreateBranch.js
import CommandSequence from './CommandSequence'
import CommandWindow from './CommandWindow'

export default class GitClearCacheAndCreateNewBranch
{
    execute(branchName)
    {
        const cwd = './appSource'
        const sequence = [
            // Stash our changes and clear the (.gitignored) `/var/cache` directory simultaneously
            [
                { command: 'git', args: ['stash'], options: { cwd} },
                { command: 'rm', args: ['-rf', 'var/cache/*'], options: { cwd} },
            ],
            // Then proceed with the command
            { command: 'git', args: ['checkout', 'master'], options: { cwd} },
            { command: 'git', args: ['reset', '--hard', 'origin/master'], options: { cwd} }
            { command: 'git', args: ['checkout', '-b', branchName], options: { cwd} }
        ]

        const window = new CommandWindow('Clean Branch: ' + branchName)
        const sequence = new CommandSequence(sequence, window.callback)

        return sequence.execute()
    }
}
```

### Watchers

Watchers are intended to be super simple classes describing a periodic command you want to run and the resulting flag you want to set on the application's state tree. A watcher allows you to scan the output of a command and set a flag to whatever value you want, which you will presumably use for display purposes on the front end.

You never have to write a custom reducer or action creator for a watcher. This is all done under the hood.

All watchers are initialized when your application starts. They are initialized in `app/watchers.js` and exported as the default constant `watchers`. To access them, simply import `watchers` from the `watchers.js` file.

```js
import watchers from 'path/to/app/watchers.js'

// `watchers` has only one method: getWatcher. This method loops through your
// watchers and returns the first one it finds with the name passed into it.
const myWatcher = watchers.getWatcher('watcherName')
myWatcher.pause()
myWatcher.start()
```

You don't have to do this, as the application boots up all watchers for you on startup. But these methods can be useful to limit watchers to only run when the watcher output target itself is visible.

#### Example Watcher

This example watcher periodically pings Google.com to check your internet connectivity.

```js
// app/watchers/InternetConnected.js

import Watcher from './Watcher.js'

export default class InternetConnected extends Watcher {

    constructor() {
        // Required
        super()

        this.name = 'internet_connected'    // The resultant node name in the watcher state tree
        this.interval = 15000               // Time between watchers running
        this.timeout = 500                  // Required
        this.command = 'ping google.com'    // The full command (or commands) to run
    }

    // Filter can return literally any value that will be attached to the state tree.
    // Here, we use true/false, but you can return an object, if preferred, or if
    // you're processing a large amount of output data and need to show a formatted
    // version of it.
    filter(commandOutput) {
        // Scan the command output for "bytes from", indicating a successful response:
        // `64 bytes from 74.125.21.100: icmp_seq=0 ttl=44 time=41.008 ms`
        // Failed pings won't have the "bytes from" text.
        if(commandOutput.includes('bytes from')) {
            return true
        }
        return false
    }

}
```

The result is that you will now have a state tree resembling:

```js
state = {
    watcher: {
        internet_connected: true | false,
        ...
    },
    ...
}
```

## User Interface

### Sections

Sections are added in two steps: first, we add the need page to the Navigation pane, then we add the appropriate route.

#### Navigation

In `app/components/Navigation/index.js`, you will find the component responsible for your application's navigation. It consists of menu items and submenu items. Each item will have a `key="/some-action"` property attached to it. This is the route that your application's new page will be displayed on.

Let's say you want to add a new page called "Git Repositories":

```jsx
<Menu theme='dark' style={{ width: '100%' }} mode="inline" onClick={navigateTo}>
  <SubMenu key="manage" title={<span><Icon type="dot-chart" /><span>Default</span></span>}>
    <Menu.Item key="/">Home</Menu.Item>
    <Menu.Item key="/git-repos">Git Repositories</Menu.Item>
  </SubMenu>
</Menu>
```

The code above will add the new menu item, adjacent to the "Home" item under the "Default" submenu. Now, we need to define the route.

#### Routes

Then, in `router.js`, link your `/git-repos` route to your section component:

```js
// app/router.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import GitRepos from './components/GitRepos'          // Path to your component


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/git-repos" component={GitRepos} />   // This tells React Router that `/git-repos` loads the `GitRepos` component
  </Route>
)
```

Now, when you click the `GitRepos` link, your custom component, in `components/GitRepos.js` or `components/GitRepos/index.js` will be displayed in the main content area. From there, you can customize this component to layout any set of commands or watchers as you need.

### Layout Components

lagniappe ships with the [Ant Design component library for React](https://ant.design/) for you to use. Use its [component documentation](https://ant.design/docs/react/introduce) when building your UI.

### Spacing

To help with spacing your components, use our custom classes:

```css
.t-spacing {
    margin-top: $spacing-large
}
```

The same classes exist for:

```css
/* Top */
.t-spacing {}
.t-spacing--large {}
.t-spacing--huge {}
.t-spacing--small {}
.t-spacing--tiny {}

/* Right */
.r-spacing {}
.r-spacing--large {}
.r-spacing--huge {}
.r-spacing--small {}
.r-spacing--tiny {}

/* Bottom */
.b-spacing {}
.b-spacing--large {}
.b-spacing--huge {}
.b-spacing--small {}
.b-spacing--tiny {}

/* Left */
.l-spacing {}
.l-spacing--large {}
.l-spacing--huge {}
.l-spacing--small {}
.l-spacing--tiny {}
```

#### Customization

Where possible, this framework tries to abstract the work of styling to two places:

* Theming Ant Design is done as an override of its internal LESS variables. To set its colors, edit `./theme.js` in the root folder of the project. **You must recompile webpack for changes to the Ant theme to appear.**
* The SASS settings file, `app/sass-global/01__settings.scss` -- for global styles and settings independent from individual component markup.

Most of the application's CSS variables live in the `app/sass-global` directory. Everything that is a setting is listed under items beginning with `01`. You can find a handy collection of mixins in files beginning with `02`. The project's global CSS is loosely organized corresponding to the [ITCSS](http://itcss.io/) methodology pioneered by [Harry Roberts](https://csswizardry.com/).

*Note* that many custom components use their own, self-contained markup next to their components. To, for example, customize the command window's behavior, look, and feel, see `app/components/CommandWindow.js` and `app/components/CommandWindow.scss`.

## Road Map

* Documentation support (in Markdown)
* Compilation/build scripts for the app
* Automatic updates
* Multiple platform support and documentation

## Credits

This framework was built using a variety of technologies for the Digital Marketing team at Radio Systems Corporation. I am open sourcing it as a way to share bugs, allow cool contributions, and highlight any bugs that may arise.

* [Electron](https://electron.atom.io/)
* [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/)
* [@chentsulin](https://github.com/chentsulin)'s [Electron React/Redux Boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
* [Ant.Design](https://ant.design/docs/react/introduce)
* [Node.js](https://nodejs.org/en/)
