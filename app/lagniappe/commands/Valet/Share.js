import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class Share
{

    execute(site, cwd = './')
    {
        const command = [{
            command: 'valet',
            args: ['share'],
            options: { cwd }
        }]
        const window = new CommandWindow('valet share')
        const process = new CommandProcess(command, window.callback, window.id)
        return process.execute()
    }


}
