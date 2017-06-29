import { exec } from 'child_process'
import parseCliTable from 'lagniappe/utils/parseCliTable'

export default class DockerImageList
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('docker image ls', { cwd }, (error, stdout, stderr) => {
                const parsedImages = parseCliTable(stdout)
                resolve(parsedImages)
            })
        })
    }

}
