import Jira from './'

export default class CheckAuthentication extends Jira
{
    execute()
    {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: this.headers,
            }
            fetch(this.baseUrl, options).then(response => {
                if(response.status == 200) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(() => {
                resolve(false)
            })
        })
    }
}
