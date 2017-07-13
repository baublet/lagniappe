import Jira from './'

export default class IssuePullRequests extends Jira
{
    execute(issueId, applicationType)
    {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: this.headers,
            }
            const url = this.baseUrl + 'rest/dev-status/1.0/issue/detail?issueId=' +
                        issueId + '&applicationType=' + applicationType + '&dataType=pullrequest'

            fetch(url, options).then(response => {
                if(response.status == 200) {
                    response.json().then(result => {
                        resolve(result.detail[0].pullRequests)
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
