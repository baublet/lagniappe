import Dependency from './Dependency'

export default class MariaDB extends Dependency {

    default()
    {
        this.dependencyName = 'MariaDB'
        this.dependencyLink = 'https://mariadb.org/'
        this.dependencyDocumentation = 'https://mariadb.org/learn/'
        this.dependencyDescription = "MariaDB Server is one of the most popular database servers in the world. It’s made by the original developers of MySQL and guaranteed to stay open source. Notable users include Wikipedia, WordPress.com and Google."
        this.command = 'mysql --version'
        this.expectedOutput = /MariaDB/i
        this.required = true
    }

    mac()
    {
        this.installCommand = 'brew install mariadb'
        this.uninstallCommand = 'brew uninstall mariadb'
    }

}
