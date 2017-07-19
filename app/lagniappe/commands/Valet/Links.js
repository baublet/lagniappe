import { exec } from 'child_process'

const REGEX = /\|\s+(\w+)\s+\|\s+(\w*)\s+\|\s+([\w\:\/\.]+)\s+\|\s+(.+)\s+\|/i

export default class Links
{
    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('valet links', { cwd }, (error, stdout, stderr) => {
                // Remove the first two lines of stdout, which is the header
                const lines = stdout.split("\n").slice(2)
                const matches = []
                lines.forEach(line => {
                    const match = line.match(REGEX)
                    if(match) matches.push(match)
                })
                if(!matches.length) resolve([])
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
