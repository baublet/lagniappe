import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class Status
{

    execute(cwd = './')
    {
        const command = [{
            command: 'git',
            args: ['status'],
            options: { cwd }
        }]
        const window = new CommandWindow('git status')
        const process = new CommandProcess(command, window.callback)
        return process.execute()
    }

}
