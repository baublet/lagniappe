import Jira from './'

export default class MyIssues extends Jira
{
    execute(offset = 0, limit = 25)
    {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: this.headers,
            }
            const url = this.baseUrl + '/rest/api/2/search?jql=assignee%20=%20currentuser()&fields=summary,reporter,priority,status'

            fetch(url, options).then(response => {
                if(response.status == 200) {
                    response.json().then(result => {
                        resolve(result.issues)
                    })
                } else {
                    resolve(false)
                }
            }).catch(() => {
                resolve(false)
            })
        })
    }
}
