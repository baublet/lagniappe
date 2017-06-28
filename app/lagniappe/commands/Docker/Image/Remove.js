import { exec } from 'child_process'

export const IMAGE_NOT_FOUND = 1
export const IMAGE_IN_USE = 2
export const IMAGE_HAS_DEPENDENT_CHILDREN = 3

export default class DockerImageRemove
{

    execute(image, force = false)
    {
        const forceCmd = force ? ' -f' : ''
        return new Promise((resolve, reject) => {
            exec('docker rmi ' + image + forceCmd, {}, (error, stdout, stderr) => {
                resolve(this.success(stdout + stderr))
            })
        })
    }

    success(response)
    {
        if (response.indexOf('no such image') > -1) {
            this.errorCode = IMAGE_NOT_FOUND
            return response
        } else if(response.indexOf('image is being used') > -1) {
            this.errorCode = IMAGE_IN_USE
            return response
        } else if(response.indexOf('image has dependent child images') > -1) {
            this.errorCode = IMAGE_HAS_DEPENDENT_CHILDREN
            return response
        }
        this.error = null
        this.errorCode = null
        return true
    }

}
