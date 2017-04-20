import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class Push
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['push'],
                options: { cwd }
            }]
            const window = new CommandWindow('git push')
            const process = new CommandProcess(command, window.callback)
            process.execute().then(()  => resolve() )
                             .catch(() => reject() )
        })
    }

}
