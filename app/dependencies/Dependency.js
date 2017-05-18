import { exec } from 'child_process'
import { exec as sudo } from 'sudo-prompt'
import logger from 'logger.js'
import os from 'os'

/**
 * The base class for defining your application's dependencies and install
 * proceedures.
 */
export default class Dependency {

    default()
    {
        // Name of this dependency for UI and logging purposes
        this.dependencyName = 'Git'

        // The command to check whether or not this dependency is installed
        this.command = 'git --version'
        // This command should never require sudo

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /git version/i

        // The commands required to install this dependency
        this.installCommand = 'brew install git'
        // If your command requires sudo/root privileges, make this true
        this.installRequiresSudo = false

        // The commands required to uninstall this dependency
        this.uninstallCommand = 'brew uninstall git'
        // If your command requires sudo/root privileges, make this true
        this.uninstallRequiresSudo = true

        // If true, this dependency will be installed automatically using the
        // above command if the user doesn't have it
        this.required = true

        // Internal properties
        // ---
        this._installed = false
    }

    /**
     * OS-specific methods that are called after the constructor
     */
    linux() {}
    mac() {}
    windows() {}


    // No need to edit below these lines
    // ---------------------------------
    
    constructor()
    {
        this.default()
        switch(os.platform()) {
            case 'darwin':
                this.mac()
                break
            case 'win32':
                this.windows()
                break
            case 'linux':
                this.linux()
                break
        }
    }

    // Returns a promise that, when resolved, lets you know whether or not this
    // dependency is installed
    isInstalled()
    {
        logger.debug('Checking if ', this.dependencyName, ' is installed')
        return new Promise((resolve, reject) => {
            // Run the command
            exec(this.command, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const output = stdout ? stdout : stderr
                logger.debug(output)
                // Get the output
                if(this.expectedOutput.exec(output)) {
                    this._installed = true
                    resolve(true)
                }
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
        logger.info('Installing ', this.dependencyName)
        return new Promise((resolve, reject) => {
            let execStyle = this.installRequiresSudo ? sudo : exec
            execStyle(this.installCommand, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const success = error ? false : true
                if(success) {
                    this._installed = true
                    logger.info('Successfully installed ', this.dependencyName, ' Messages:', stdout, stderr)
                } else {
                    logger.error('FAILED to install ', this.dependencyName, ' Error: ', error, stderr, stdout)
                }
                resolve({
                    success,
                    error,
                    output: stdout + stderr
                })
            })
        })
    }

    // Returns a promise that, when resolved, indicates whether or not the command
    // was successfully uninstalled. Resolve signature:
    // {
    //      success: true|false         Installed or not
    //      error: (string)             Error message (if applicable)
    //      output: string              Full output (for logging purposes)
    // }
    uninstall()
    {
        logger.info('Uninstalling ', this.dependencyName)
        return new Promise((resolve, reject) => {
            let execStyle = this.uninstallRequiresSudo ? sudo : exec
            execStyle(this.uninstallCommand, { name: 'lagniappe' }, (error, stdout, stderr) => {
                const success = error ? false : true
                if(success) {
                    this._installed = true
                    logger.info('Successfully uninstalled ', this.dependencyName)
                } else {
                    logger.error('FAILED to uninstall ', this.dependencyName, ' Error: ', error, stderr, stdout)
                }
                resolve({
                    success,
                    error,
                    output: stdout + stderr
                })
            })
        })
    }
}
