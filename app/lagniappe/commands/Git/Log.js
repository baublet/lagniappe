import { exec } from 'child_process'

const COMMIT    = 1,
      AUTHOR    = 2,
      DATE      = 3,
      MESSAGE   = 4,
      BLANK     = 0


export default class Log
{

    execute(cwd = './', max = 10, offset = 0)
    {
        return new Promise((resolve, reject) => {
            exec('git log --pretty=medium -n ' + max + ' --skip=' + offset, { cwd }, (error, stdout, stderr) => {
                const parsedCommits = this.parseLog(stdout)
                resolve(parsedCommits)
            })
        })
    }

    parseLog(logContent) {
        let split = logContent.split('\n')
        let commits = []
        let currentCommit = -1
        for(let i = 0; i < split.length; i++) {
            const line = split[i]
            const lineType = this.lineType(line)
            switch(lineType) {
                case COMMIT:
                    currentCommit++
                    commits[currentCommit] = {
                        commit: line.substr(7).trim(),
                        message: []
                    }
                    break;
                case AUTHOR:
                    commits[currentCommit].author = line.substr(8).trim()
                    break;
                case DATE:
                    commits[currentCommit].date = line.substr(6).trim()
                    break
                case MESSAGE:
                    commits[currentCommit].message.push(line)
                    break
            }
        }
        return commits
    }

    lineType(line) {
        if(line.substr(0, 7) == 'commit ') {
            return COMMIT
        }

        if(line.substr(0, 8) == 'Author: ') {
            return AUTHOR
        }

        if(line.substr(0, 6) == 'Date: ') {
            return DATE
        }

        if(line.substr(0, 4) == '    ') {
            return MESSAGE
        }

        return BLANK
    }

}
