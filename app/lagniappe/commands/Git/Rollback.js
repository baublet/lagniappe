import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class Rollback
{

    execute(cwd = './', hash)
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['checkout', hash],
                options: { cwd }
            }]
            const window = new CommandWindow('git rollback')
            const process = new CommandProcess(command, window.callback, window.id)
            process.execute().then(()  => { resolve() })
                             .catch(e => {
                                 reject(e)
                                 console.log(e)
                             })
        })
    }

}
