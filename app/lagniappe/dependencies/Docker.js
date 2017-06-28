import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Docker extends Dependency {

    default()
    {
        this.dependencyName = 'Docker'
        this.dependencyLink = 'https://www.docker.com/'
        this.dependencyDocumentation = 'https://docs.docker.com/'
        this.dependencyDescription = 'Docker is an open-source project that automates the deployment of applications inside software containers. Docker provides an additional layer of abstraction and automation of operating-system-level virtualization on Windows and Linux.'
        this.installLink = 'https://docs.docker.com/engine/installation/'
        this.command = 'docker -v'
        this.expectedOutput = /Docker version/i
        this.required = true
    }

    mac()
    {
        this.installCommand = 'brew cask install docker'
        this.uninstallCommand = 'brew cask uninstall docker'
    }

}
