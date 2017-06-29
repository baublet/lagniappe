export default class CheckAuthentication
{
    execute(baseUrl, email, password)
    {
        return new Promise((resolve, reject) => {
            const headers = new Headers()
            const credentials = btoa(email + ":" + password)
            headers.append("Authorization", "Basic " + credentials)
            const options = {
                method: 'GET',
                headers,
            }
            fetch(baseUrl, options).then(response => {
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
