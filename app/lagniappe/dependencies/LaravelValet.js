import Dependency from './Dependency'


export default class LaravelValet extends Dependency {

    default()
    {
        this.dependencyName = 'Valet'
        this.required = true
    }

    mac() {
        this.dependencyLink = 'https://github.com/laravel/valet'
        this.dependencyDocumentation = 'https://laravel.com/docs/5.4/valet'
        this.dependencyDescription = 'Valet is a Laravel development environment for Mac minimalists. No Vagrant, no /etc/hosts file. You can even share your sites publicly using local tunnels.'

        this.command = 'valet'
        this.expectedOutput = /Available commands/i

        this.installCommand = 'composer global require laravel/valet && valet install'
        this.installRequiresSudo = false

        this.uninstallCommand = 'valet stop && valet uninstall && composer global remove laravel/valet'
        this.uninstallRequiresSudo = false
    }

    windows() {

    }

    linux() {

    }

}
