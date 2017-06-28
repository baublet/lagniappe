import Dependency from './Dependency'

/**
 * The base class for defining your application's dependencies and installation
 * proceedures.
 */
export default class Go extends Dependency {

    default()
    {
        this.dependencyName = 'Go'
        this.dependencyLink = 'https://golang.org/'
        this.dependencyDocumentation = 'https://golang.org/doc/'
        this.dependencyDescription = "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software."
        this.command = 'go version'
        this.expectedOutput = /go version/i
        this.required = false
    }

    mac() {
        this.allowAutomatedInstall = false
        this.allowAutomatedUninstall = false
        this.installLink = "http://www.google.com"
        this.uninstallLink = "http://www.yahoo.com"
        this.installCommand = 'brew install go'
        this.uninstallCommand = 'brew uninstall go'
    }

}
