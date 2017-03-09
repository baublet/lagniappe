import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class Command
{

    execute()
    {
        const command = {
            command: 'tail',
            args: ['-n40', '-f', 'package.json']
        }
        const window = new CommandWindow('Multiple Commands')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
