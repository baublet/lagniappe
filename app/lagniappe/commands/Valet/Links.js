import { exec } from 'child_process'

const REGEX = /\| (\w+) \|\s+(\w*)\s+\| ([\w\:\/\.]+) \| (.+) \|/ig

export default class Links
{
    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('valet links', { cwd }, (error, stdout, stderr) => {
                const matches = []
                let match = []
                while ((match = REGEX.exec(stdout)) !== null) {
                    matches.push(match)
                }
                resolve(matches.map(match => {
                    return {
                        site: match[1],
                        ssl:  match[2],
                        url:  match[3],
                        path: match[4],
                    }
                }))
            })
        })
    }
}
