import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Git extends Dependency {

    constructor()
    {
        // Required
        super()

        // Name of this dependency for UI and logging purposes
        this.dependencyName = 'Git'

        // The command to check whether or not this dependency is installed
        this.command = 'git --version'

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /git version/i

        // The commands required to install this dependency
        this.installationCommand = 'brew install git'

        // Uninstallation command
        this.uninstallCommand = 'brew uninstall git'
    }

}
