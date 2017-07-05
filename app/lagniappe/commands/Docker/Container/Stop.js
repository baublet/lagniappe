import { exec } from 'child_process'

export default class Stop
{

    execute(container, cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('docker container stop ' + container, {}, (error, stdout, stderr) => {
                resolve()
            })
        })
    }

}
