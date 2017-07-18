import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class Prune
{

    execute(cwd = './')
    {
        const command = [{
            command: 'docker',
            args: ['container', 'prune', '-f'],
            options: { cwd }
        }]
        const window = new CommandWindow('prune containers')
        const process = new CommandProcess(command, window.callback, window.id)
        return process.execute()
    }

}
