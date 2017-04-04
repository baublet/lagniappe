import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Go extends Dependency {

    constructor()
    {
        // Required
        super()

        // Name of this dependency for UI and logging purposes
        this.dependencyName = 'Go'

        // The command to check whether or not this dependency is installed
        this.command = 'go version'

        // A regular expression of what you expect the command to output if the
        // dependency is installed
        this.expectedOutput = /go version/i

        // The commands required to install this dependency
        this.installationCommand = 'brew install go'

        // Uninstallation command
        this.uninstallCommand = 'brew uninstall go'
    }

}
