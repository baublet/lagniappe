import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class DockerImageRemoveAll
{

    execute(cwd = './')
    {
        const command = [{
            command: 'docker rmi $(docker images -q)',
            args: { shell: true },
            options: { cwd },
        }]
        const window = new CommandWindow('Clear Docker Images')
        const process = new CommandProcess(command, window.callback)
        return process.execute()
    }

}
