import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class DockerImageInfo
{

    execute(imageId)
    {
        const command = [{
            command: 'docker image history ' + imageId,
            args: { shell: true },
            options: {},
        }]
        const window = new CommandWindow('Docker Image Info')
        const process = new CommandProcess(command, window.callback)
        return process.execute()
    }

}
