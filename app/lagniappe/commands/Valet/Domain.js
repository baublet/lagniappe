import { exec } from 'child_process'

export default class Domain
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('valet domain', { cwd }, (error, stdout, stderr) => {
                resolve(stdout)
            })
        })
    }

}
