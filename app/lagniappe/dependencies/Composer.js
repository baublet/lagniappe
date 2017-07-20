import Dependency from './Dependency'


export default class Composer extends Dependency {

    default()
    {
        this.dependencyName = 'PHP Composer'
        this.required = true
    }

    mac() {
        this.dependencyLink = 'https://github.com/laravel/valet'
        this.dependencyDocumentation = 'https://laravel.com/docs/5.4/valet'
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
