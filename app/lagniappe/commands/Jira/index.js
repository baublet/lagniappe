import config from 'config'

export default class Jira {
    constructor()
    {
        const headers = new Headers()
        const username = localStorage.getItem('jira-username')
        const password = localStorage.getItem('jira-password')
        const credentials = btoa(username + ":" + password)
        headers.append("Authorization", "Basic " + credentials)
        this.headers = headers
        this.baseUrl = config.jira.baseUrl
    }
}
