import Jira from './'

export default class GitHubInfo extends Jira
{
    execute(issueId)
    {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: this.headers,
            }
            const url = this.baseUrl + '/rest/dev-status/1.0/issue/detail?issueId=' + issueId + '&applicationType=github&dataType=branch'

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
