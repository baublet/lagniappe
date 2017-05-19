import Dependency from './Dependency'


export default class PackageManager extends Dependency {

    default()
    {
        this.dependencyName = 'PackageManager'
        this.required = true
    }

    mac() {
        this.dependencyName = 'Package Manager: Homebrew'
        this.dependencyLink = 'https://brew.sh/'
        this.dependencyDocumentation = 'http://docs.brew.sh/'
        this.dependencyDescription = 'Homebrew is a free and open-source software package management system that simplifies the installation of software on Apple\'s macOS operating system.'

        this.command = 'brew -v'
        this.expectedOutput = /Homebrew/i

        this.installCommand = '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
        this.installRequiresSudo = true

        this.uninstallCommand = 'curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall --output ./uninstall && chmod +x ./uninstall && ./uninstall -f && rm -rf ./uninstall'
        this.uninstallRequiresSudo = true
    }

    windows() {
        this.dependencyName = 'Package Manager: Chocolatey'
        this.dependencyLink = 'https://chocolatey.org/'
        this.dependencyDocumentation = 'https://chocolatey.org/docs'
        this.dependencyDescription = "Chocolatey is a machine-level package manager and installer for software packages, built for the Windows NT platform. It is an execution engine using the NuGet packaging infrastructure and Windows PowerShell to provide an automation tool for installing software on Windows machines, designed to simplify the process from the user perspective."

        this.command = 'choco -v'
        this.expectedOutput = /Chocolatey/i

        this.installCommand = '@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString(\'https://chocolatey.org/install.ps1\'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin"'
        this.installRequiresSudo = true

        this.uninstallLink = 'https://chocolatey.org/docs/uninstallation'
        this.allowAutomatedUninstall = false
        this.uninstallCommand = ''
    }

    linux() {

    }

}
