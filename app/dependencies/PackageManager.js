import Dependency from './Dependency'


export default class PackageManager extends Dependency {

    default()
    {
        this.dependencyName = 'PackageManager'
        this.required = true
    }

    mac() {
        this.dependencyName = 'Homebrew'
        this.command = 'brew -v'
        this.expectedOutput = /Homebrew/i
        this.installCommand = '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
        this.installRequiresSudo = true
        this.uninstallCommand = 'curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall --output ./uninstall && chmod +x ./uninstall && ./uninstall -f && rm -rf ./uninstall'
        this.uninstallRequiresSudo = true
    }

    windows() {

    }

    linux() {

    }

}
