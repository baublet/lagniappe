import Dependency from './Dependency'


export default class Composer extends Dependency {

    default()
    {
        this.dependencyName = 'PHP Composer'
        this.required = true
    }

    mac() {
        this.dependencyLink = 'https://getcomposer.org/'
        this.dependencyDocumentation = 'https://getcomposer.org/doc/'
        this.dependencyDescription = 'Composer is the defacto package manager for PHP.'

        this.command = 'composer -V'
        this.expectedOutput = /Composer version/i

        this.installCommand = 'brew install composer'
        this.installRequiresSudo = false

        this.uninstallCommand = 'brew uninstall composer'
        this.uninstallRequiresSudo = false
    }

    windows() {

    }

    linux() {

    }

}
