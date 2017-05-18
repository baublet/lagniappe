import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Docker extends Dependency {

    default()
    {
        this.dependencyName = 'Docker'
        this.command = 'docker -v'
        this.expectedOutput = /Docker version/i
        this.required = true
    }

    mac() {
        this.installCommand = 'brew cask install docker'
        this.uninstallCommand = 'brew cask uninstall docker'
    }

}
