import CommandProcess from 'commands/CommandProcess'
import CommandWindow from 'commands/CommandWindow'

export default class Revert
{

    execute(cwd = './', hash)
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['revert', hash, '--no-edit'],
                options: { cwd }
            }]
            const window = new CommandWindow('git revert')
            const process = new CommandProcess(command, window.callback)
            process.execute().then(()  => { resolve() })
                             .catch(() => { reject() })
        })
    }

}
