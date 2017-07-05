import { exec } from 'child_process'

export default class DockerContainerRemoveAll
{

    execute()
    {
        return new Promise((resolve, reject) => {
            exec('docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)', {}, (error, stdout, stderr) => {
                resolve()
            })
        })
    }

}
