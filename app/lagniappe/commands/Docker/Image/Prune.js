import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class DockerImagePrune
{

    execute(cwd = './')
    {
        const command = [{
            command: 'docker rmi $(docker images -f dangling=true -q)',
            args: { shell: true },
            options: { cwd },
        }]
        const window = new CommandWindow('Prune Docker Images')
        const process = new CommandProcess(command, window.callback)
        return process.execute()
    }

}
