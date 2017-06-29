import dependencies from 'dependencies.js'

class Dependencies {
    constructor(dependencies) {
        this.dependencies = dependencies
    }

    getDependencies() {
        return this.dependencies
    }

    getDependenciesCount() {
        return this.dependencies ? this.dependencies.length : 0
    }

    // Returns a promise that resolves once all of the above dependencies are
    // checked. The resolver passes through the status of the check in the following
    // signature:
    //
    // [
    //      {
    //          dependency: string          Dependency name
    //          installed: true|false       Whether or not the dependency is
    //                                      installed on the user's system
    //      },
    //      ...
    // ]
    //
    // Updates the callback function with the name of the dependency we're currently
    // checking the installation status of. Callback should be something like:
    //
    // function(dep) {
    //    this.setState({ name: dep })
    // }
    checkInstalled(callback) {
        let promise = Promise.resolve()
        this.dependencies.forEach(dependency => {
            promise = promise.then(() => {
                callback(dependency.dependencyName)
                return dependency.isInstalled().then(installed => {
                    dependency._installed = !! installed
                })
            })
        })
        return promise
    }

    install(callback) {
        let promise = Promise.resolve()
        this.dependencies.forEach(dependency => {
            if(dependency._installed || !dependency.required) {
                return
            }
            if(!dependency.allowAutomatedInstallation) {
                return
            }
            promise = promise.then(() => {
                callback(dependency.dependencyName)
                return dependency.install().then(output => {
                    dependency._installationOutput = output
                })
            })
        })
        return promise
    }
}

export default new Dependencies(dependencies)
