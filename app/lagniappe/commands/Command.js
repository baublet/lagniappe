import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

export default class Command
{

    execute()
    {
        const command = {
            // Set this to prepend this string before the command. This way you
            // can have multiple commands running simultaneously
            id: 'test',
            // The command itself
            command: 'ls',
            // The arguments (use a new array element where you would otherwise
            // use a space)
            args: ['-lha']
        }
        const window = new CommandWindow('Test Command')
        const process = new CommandProcess(command, window.callback)
        process.execute()
    }

}
