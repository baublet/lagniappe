import { exec } from 'child_process'
import parseCliTable from 'lagniappe/utils/parseCliTable'

export default class ShortLog
{

    execute(since = false, cwd = './')
    {
        since = since ? ' --since="' + since + '"' : ''
        return new Promise((resolve, reject) => {
            exec('git shortlog -sn' + since + ' < /dev/tty', { cwd }, (error, stdout, stderr) => {
                stdout = "commits   name\n" + stdout
                const parsedCommits = parseCliTable(stdout)
                resolve(parsedCommits)
            })
        })
    }

}
