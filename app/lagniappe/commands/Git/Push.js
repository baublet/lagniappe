import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

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
            const process = new CommandProcess(command, window.callback, window.id)
            process.execute().then(()  => resolve() )
                             .catch(() => reject() )
        })
    }

}
