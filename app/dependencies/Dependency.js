import { exec } from 'child_process'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Dependency {

    constructor()
    {
        // Required in derived classes
        // super()

        // Name of this dependency for UI and logging purposes
        this.dependencyName = 'Git'

        // The command to check whether or not this dependency is installed
        this.command = 'git --version'

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /git version/i

        // The commands required to install this dependency
        this.installationCommand = 'brew install git'
    }


    // No need to edit below these lines
    // ---------------------------------

    // Returns a promise that, when resolved, lets you know whether or not this
    // dependency is installed
    isInstalled()
    {
        console.log('Checking ', this.dependencyName)
        return new Promise((resolve, reject) => {
            // Run the command
            exec(this.command, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const output = stdout ? stdout : stderr
                console.log(output)
                // Get the output
                if(this.expectedOutput.exec(output)) resolve(true)
                resolve(false)
            })
        })
    }

    // Returns a promise that, when resolved, indicates whether or not the command
    // was successfully installed. Resolve signature:
    // {
    //      success: true|false         Installed or not
    //      error: (string)             Error message (if applicable)
    //      output: string              Full output (for logging purposes)
    // }
    install()
    {
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
