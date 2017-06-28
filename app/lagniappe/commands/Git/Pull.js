import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class Pull
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['pull'],
                options: { cwd }
            }]
            const window = new CommandWindow('git pull')
            const process = new CommandProcess(command, window.callback)
            process.execute().then(()  => { resolve() })
                             .catch(() => { reject() })
        })
    }

}
