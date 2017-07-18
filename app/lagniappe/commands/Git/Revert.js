import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

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
            const process = new CommandProcess(command, window.callback, window.id)
            process.execute().then(()  => { resolve() })
                             .catch(() => { reject() })
        })
    }

}
