# Electron DevOps Tool

A framework for simplifying developer operations.

## What is it?

Devops is hard. There a ton of commands to remember, concerns about cross-platform availability, software suites to install, people of different experience levels to address, and frequent pain points that make it often one of the most frustrating aspects of development.

This tool is designed to help DevOps engineers consolidate the process of running local development environments and housing a team's documentation by balling them into a cross-platform Electron application.

Developers and DevOps engineers can run the program from `yarn dev` so they can add new commands or adjust settings as necessary; the quality assurance team can run an auto-updating GUI customized for their needs; and the creative team can run their own custom staging environment.

## Documentation

**Note:** A working knowledge of React, Redux, and Node are required to gain the most benefit from this framework.

At its core, this tool is merely a way to layout a React/Redux front end modified and interacting with the user's environment via:

* Commands `app/commands`
    * Commands that spawn child processes and output the result to the command console.
    * Example: `docker-compose up`
* Watchers `app/watchers`
    * Commands spawning child processes whose output is *not* logged to a console window, but will instead be processed by the watcher function and then modify state.
    * Example: used to call `docker ps -a` and grep it for your application's running containers, then modifying the application's state to tell the user that the application is running.

Although you should know a fair bit of React and Redux to get the most out of this framework, it is possible to just use Watchers and Commands to do the bulk -- perhaps even all -- of what you need without writing additional action creators or reducers.

### Commands

Commands are classes that let you run asynchronous commands from the command line of the user's computer. They are configured to allow you to pipe the output to a command window with trivial effort. These commands are run in a different thread than the main Electron thread, so should not block your application's rendering.

They return promises, allowing you to chain commands in a sequence. Have a long string of commands to run one after the other? Check out the `CommandSequence` class for information on how to do that.

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

The same command, but sending its contents to a command window, rather than to the javascript console:

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

export default class GitCreateBranchAndClearCache
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

Although you don't have to use the layout shipped with this tool, if you do, there are a number of helpers available to help you build your interface. One of these are sections.

A typical devops tool will have several sections to help manage an environment. To see the sections and modify them, you need to be aware of two files:

* `app/components/Header/Pages.js` - This file controls the layout of section links.
* `app/routes.js` - Link routes to your new section.

To add a section to your application, edit `Pages.js` to add your new link:

```js
// app/components/Header/Pages.js

import React, { Component } from 'react'
import PageLink from './PageLink'

import styles from './Pages.scss'

class Pages extends Component {
    getChildContext() {
      return {router: this.props.router}
    }

    render() {
      return (
        <div className={styles.header__pages}>
            <PageLink to="/">Main</PageLink>
            <PageLink to="/git">Git</PageLink>  // Your new link
        </div>
      )
    }
}

Pages.childContextTypes = {
  router: React.PropTypes.object
}

export default Pages
```

Then, in `router.js`, link your `/git` route to your section component:

```js
// app/router.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Git from './components/Git'          // Path to your component


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/git" component={Git} />   // This tells React Router that `/git` loads the `Git` component
  </Route>
)
```

Now, when you click the `Git` link, your custom component, in `components/Git.js` or `components/Git/index.js` will be displayed in the main content area.

### Layout Components
