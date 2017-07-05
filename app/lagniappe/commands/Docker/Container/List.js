import { exec } from 'child_process'
import parseCliTable from 'lagniappe/utils/parseCliTable'

export default class DockerContainerList
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('docker container ls -a', { cwd }, (error, stdout, stderr) => {
                const parsedImages = parseCliTable(stdout)
                resolve(parsedImages)
            })
        })
    }

}
