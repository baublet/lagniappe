import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Go extends Dependency {

    default()
    {
        this.dependencyName = 'Go'
        this.command = 'go version'
        this.expectedOutput = /go version/i
        this.required = false
    }

    mac() {
        this.installCommand = 'brew install go'
        this.uninstallCommand = 'brew uninstall go'
    }

}
