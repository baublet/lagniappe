import Watcher from 'lagniappe/Watcher'

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
        if(commandOutput.includes('bytes from')) {
            return true
        }
        return false
    }

}
