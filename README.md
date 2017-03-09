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

Commands are classes that let you run asynchronous commands from the command line of the user's computer, and pipe the output to a command window. 

### Watchers

Watchers are intended to be super simple classes describing a periodic command you want to run and the resulting flag you want to set on the application's state tree. You will never have to write a custom reducer or action creator for a watcher. This is all done under the hood.

All watchers are initialized when your application starts. They are initialized in `app/watchers.js` and exported as the default constant `watchers`. To access them, simply import `watchers` from the `watchers.js` file.

```js
import watchers from 'path/to/app/watchers.js'

// `watchers` has only one method: getWatcher. This method loops through your
// watchers and returns the first one it finds with the name passed into it.
const myWatcher = watchers.getWatcher('watcherName')
myWatcher.pause()
myWatcher.start()
```
