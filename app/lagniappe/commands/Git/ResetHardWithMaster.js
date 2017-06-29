import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class ResetHardWithMaster
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['reset', '--hard', 'origin/master'],
                options: { cwd }
            }]
            const window = new CommandWindow('git reset --hard origin/master')
            const process = new CommandProcess(command, window.callback)
            process.execute().then(()  => { resolve() })
                             .catch(() => { reject() })
        })
    }

}
