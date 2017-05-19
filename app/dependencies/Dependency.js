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
        // Link to this dependency (a URL for the software website)
        this.dependencyLink = 'https://git-scm.com/'
        // Link to this software's documentation
        this.dependencyDocumentation = 'https://git-scm.com/documentation'

        // The command to check whether or not this dependency is installed
        this.command = 'git --version'
        // This command should never require sudo

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /git version/i

        // Flag this as true if you allow automatic installation. If it's false,
        // we will skip it in the dependency checking step.
        this.allowAutomatedInstall = true
        // The link to this dependency's installation instructions. Useful for
        // dependencies that you can't automatically install
        this.installLink = 'https://git-scm.com/downloads'
        // The commands required to install this dependency. Leave this false if
        // there is no automatic installation procedure
        this.installCommand = 'brew install git'
        // If your command requires sudo/root privileges, make this true
        this.installRequiresSudo = false

        // Flag this as false to disallow automated uninstallation. This is
        // necessary for many package managers
        this.allowAutomatedUninstall = true
        // Link to instructions on how to uninstall this software. Useful for
        // packages that the user has to install manually
        this.uninstallLink = ''
        // The commands required to uninstall this dependency. Leave this false
        // if there is no automatic uninstallation procedure
        this.uninstallCommand = 'brew uninstall git'
        // If your command requires sudo/root privileges, make this true
        this.uninstallRequiresSudo = true

        // If true, this dependency will be installed automatically using the
        // above command if the user doesn't have it
        this.required = true
    }

    /**
     * OS-specific methods that are called after the constructor. Use the same
     * above variables for these methods so that you can run environment-aware
     * commands. For example, the process to install git on Windows is different
     * than the process to install git on MacOS. Use these classes to alter
     * this.command to reflect that.
     */
    linux() {}
    mac() {}
    windows() {}


    // No need to edit below these lines
    // ---------------------------------
    
    constructor()
    {
        this.dependencyName = 'NO DEPENDENCY NAME SET!'
        this.dependencyLink = 'https://www.github.com/baublet/lagniappe'
        this.dependencyDocumentation = 'https://www.github.com/baublet/lagniappe'
        this.command = ''
        this.expectedOutput = ''
        this.allowAutomatedInstall = true
        this.installCommand = ''
        this.installLink = 'https://www.github.com/baublet/lagniappe'
        this.installRequiresSudo = false
        this.allowAutomatedUninstall = true
        this.uninstallLink = 'https://www.github.com/baublet/lagniappe'
        this.uninstallCommand = ''
        this.uninstallRequiresSudo = false
        this.required = true

        this._installed = false

        // Attach any default settings to this class
        this.default()

        // Then, do the OS-specific settings
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
