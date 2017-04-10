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

        this.dependencyName = 'Git'

        this.command = 'git --version'

        this.expectedOutput = /git version/i

        this.installationCommand = 'brew install git'

        this.uninstallCommand = 'brew uninstall git'

        this.required = true
    }

}
