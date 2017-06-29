import CommandProcess from 'lagniappe/commands/CommandProcess'
import CommandWindow from 'lagniappe/commands/CommandWindow'

export default class CurrentBranch
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['branch'],
                options: { cwd }
            }]
            const process = new CommandProcess(command, (data, error, finished) => {
                const outputParts = new RegExp(/\* (.*)/i).exec(data)
                if(outputParts) {
                    resolve(outputParts[1])
                    return
                }
                reject('No branch could be identified!')
            })
            process.execute()
        })
    }

}
