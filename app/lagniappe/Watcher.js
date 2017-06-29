import { store } from 'index.js'
import { setWatcherData } from 'lagniappe/actions/watcher.js'
import { exec } from 'child_process'

export default class Watcher {

    // Every watcher must have the following variables defined
    constructor() {
        // A unique name for this watcher. This is the name with which you will access
        // the watcher via Redux.
        this.name = 'my-watcher-name'

        // This watcher will execut once every 5 seconds
        this.interval = 5000

        // If the watcher takes longer than 2 seconds to run, we will automatically
        // kill it and pass whatever it send back to our filter function
        this.timeout = 2000

        // The command you want this watcher to run
        this.command = 'docker ps -a'
    }

    // Watchers MUST have this method defined. It takes the variable `commandOutput`
    // which is the output of the command run (or the truncated output if the command
    // took too long to run).
    //
    // This function should return an object that we will then pass into Redux that
    // you can use to display information to users of the GUI.
    //
    // For example, your filter might get the results of a `docker ps -a` command,
    // scan it for your application's containers being active, and return true.
    // This would set in Redux `watcher.appRunning = true`, provided your watcher's
    // name is `appRunning`. In your React components, you would subscribe to your
    // watcher state tree (via the `connect` function in `react-redux`) and alter
    // the component's messaging depending on the state of `watcher.appRunning`.
    filter(comandOutput) {
        if (process.env.NODE_ENV === 'development') {
            throw "Custom watchers must have a filter method defined"
        }
    }

    // Do not overwrite the below methods unless you know what you're doing
    // --------------------------------------------------------------------

    execute() {
        if(this._paused) return
        // Run the command via new child process
        exec(this.command, { timeout: this.timeout }, (error, stdout, stderr) => {
            if(error) stdout += '\n' + stderr
            stdout += ''
            // Send it through our filter method
            const result = this.filter(stdout)

            // Pass the result through to our state
            store.dispatch( setWatcherData(this.name, result) )
        })
    }

    pause() {
        this._paused = true
    }

    start() {
        // We can set the timeout to zero for a near-indefinite timeout
        if(this.timeout == 0) {
            this.timeout = 999999
        }
        if(!this.name || !this.interval || !this.timeout || !this.command) {
            throw "Custom watchers require a constructor method that set this.name, this.interval, this.timeout, and this.command!"
        }

        this._paused = false
        this._interval = setInterval(this.execute.bind(this), this.interval)
        this.execute()
    }

}
