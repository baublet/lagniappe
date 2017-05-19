import { exec } from 'child_process'

export default class DockerImageList
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('docker image ls', { cwd }, (error, stdout, stderr) => {
                const parsedImages = this.parseImages(stdout)
                resolve(parsedImages)
            })
        })
    }

    parseImages(output)
    {
        const lineMatcher = /(\S+(?: \S+)*)/g
        const lines = output.split("\n")
        const images = []
        let headings = []
        for(let i = 0; i < lines.length; i++) {
            if (i == 0) {
                headings = lines[i].match(lineMatcher)
            } else {
                const columns = lines[i].match(lineMatcher)
                if(!columns || !columns.length) continue;
                const image = {}
                headings.forEach((heading, i) => image[heading] = columns[i])
                images.push(image)
            }
        }
        return images
    }

}
