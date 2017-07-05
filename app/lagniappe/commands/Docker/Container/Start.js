import { exec } from 'child_process'

export default class Start
{

    execute(container, cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('docker container start ' + container, {}, (error, stdout, stderr) => {
                resolve()
            })
        })
    }

}
