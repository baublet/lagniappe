import { exec } from 'child_process'

export const CONTAINER_NOT_FOUND = 1
export const CONTAINER_IN_USE = 2

export default class DockerContainerRemove
{

    execute(container, force = false)
    {
        const forceCmd = force ? ' -f' : ''
        return new Promise((resolve, reject) => {
            exec('docker container rm ' + container + forceCmd, {}, (error, stdout, stderr) => {
                resolve(this.success(stdout + stderr))
            })
        })
    }

    success(response)
    {
        response = response.toLowerCase()
        if (response.indexOf('no such container') > -1) {
            this.errorCode = CONTAINER_NOT_FOUND
            return response
        } else if(response.indexOf('a running container') > -1) {
            this.errorCode = CONTAINER_IN_USE
            return response
        }
        this.error = null
        this.errorCode = null
        return true
    }

}
