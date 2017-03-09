import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class Command
{

    execute()
    {
        const command = [
            {
                id: 'yahoo',
                command: 'curl',
                args: ['yahoo.com']
            },
            {
                id: 'ls',
                command: 'ls'
            },
            {
                id: 'google',
                command: 'curl',
                args: ['google.com']
            }
        ]
        const window = new CommandWindow('Multiple Commands')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
