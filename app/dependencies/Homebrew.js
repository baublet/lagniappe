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
