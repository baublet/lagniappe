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

        this.dependencyName = 'Homebrew'

        this.command = 'brew -v'

        this.expectedOutput = /Homebrew/i

        this.installationCommand = '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'

        this.uninstallCommand = 'curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall --output ./uninstall && chmod +x ./uninstall && ./uninstall -f && rm -rf ./uninstall'

        this.required = true
    }

}
