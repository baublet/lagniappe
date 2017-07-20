import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Php70 extends Dependency {

    default()
    {
        this.dependencyName = 'PHP 7.0'
        this.dependencyLink = 'http://php.net/'
        this.dependencyDocumentation = 'http://php.net/docs.php'
        this.dependencyDescription = "PHP is a popular general-purpose scripting language that is especially suited to web development."
        this.command = 'php -v'
        this.expectedOutput = /PHP 7\.0/i
        this.required = true
    }

    mac() {
        this.installCommand = 'brew install php70'
        this.uninstallCommand = 'brew uninstall php70'
    }

}
