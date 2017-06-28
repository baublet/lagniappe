import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

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
            const process = new CommandProcess(command, window.callback)
            process.execute().then(()  => { resolve() })
                             .catch(e => {
                                 reject(e)
                                 console.log(e)
                             })
        })
    }

}
