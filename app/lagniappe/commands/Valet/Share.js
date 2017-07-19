import { exec, spawn } from 'child_process'
import path from 'path'

const REGEX = /https?:\/\/[a-zA-Z0-9]+\.ngrok\.io/i

export default class Share
{

    execute(cwd)
    {
        return new Promise((resolve, reject) => {
            const resolvedPath = path.resolve(cwd).trim()
            if(!resolvedPath) reject('Unable to resolve path: ', cwd)
            const command = 'cd ' + resolvedPath + ' && valet share > /dev/null &'

            exec('killall ngrok')

            exec(command, (error, stdout, stderr) => {
                if(error && !error.message.includes('No matching processes')) return reject('Unable to start ngrok. Error: ' + stdout + stderr)
                exec('valet fetch-share-url', (error, stdout, stderr) => {
                    const output = stdout
                    const url = output.match(REGEX)
                    if(url && url[0]) return resolve(url[0])
                    reject('Unable to get the URL. Error: ' + error + stdout + stderr)
                })
            })


        })
    }


}
