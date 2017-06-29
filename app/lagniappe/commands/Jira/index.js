export default class Jira {
    constructor(baseUrl, username, password)
    {
        const headers = new Headers()
        const credentials = btoa(username + ":" + password)
        headers.append("Authorization", "Basic " + credentials)
        this.headers = headers
        this.baseUrl = baseUrl
    }
}
