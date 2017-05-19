import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Git extends Dependency {

    default()
    {
        this.dependencyName = 'Git'
        this.dependencyLink = 'https://git-scm.com/'
        this.dependencyDocumentation = 'https://git-scm.com/documentation'
        this.dependencyDescription = 'Git is a version control system (VCS) for tracking changes in computer files and coordinating work on those files among multiple people. It is primarily used for software development.'
        this.command = 'git --version'
        this.expectedOutput = /git version/i
        this.required = true
    }

    mac()
    {
        this.installCommand = 'brew install git'
        this.uninstallCommand = 'brew uninstall git'
    }

}
