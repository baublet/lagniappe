import Jira from './'

export default class IssueInfo extends Jira
{
    execute(issueIdOrKey)
    {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: this.headers,
            }
            const url = this.baseUrl + '/rest/api/2/issue/' + issueIdOrKey

            fetch(url, options).then(response => {
                if(response.status == 200) {
                    response.json().then(result => {
                        resolve(result)
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
