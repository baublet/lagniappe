import Watcher from './Watcher.js'

export default class InternetConnected extends Watcher {

    constructor() {
        // Required
        super()

        this.name = 'internet_connected'
        this.interval = 15000
        this.timeout = 500
        this.command = 'ping google.com'
    }

    filter(commandOutput) {
        console.log('Filtering watcher InternetConnected')
        if(commandOutput.includes('bytes from')) {
            return true
        }
        return false
    }

}
