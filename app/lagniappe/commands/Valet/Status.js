import { exec } from 'child_process'

const REGEX = '\\s+(\\w+)\\s+(\\S+)\\s+(\\S+)'

export default class Status
{

    execute(services, cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('brew services list', { cwd }, (error, stdout, stderr) => {
                const outputLines = stdout.split("\n")
                resolve(services.map(serviceObject => {
                    const regex = new RegExp(serviceObject.service + REGEX, 'i')
                    const matches = stdout.match(regex)
                    if(!matches) return serviceObject

                    const statusObject = Object.assign({}, serviceObject)
                    if(matches && matches[1].toLowerCase() == 'started')
                    {
                        statusObject.status = 1
                        statusObject.info = {
                            user:  matches[2],
                            plist: matches[3],
                        }
                    }
                    return statusObject
                }))
            })
        })
    }

}
