import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class Command
{

    execute()
    {
        const command = {
            id: 'test',
            command: 'ls',
            args: ['-lha']
        }
        const window = new CommandWindow('Test Command')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
