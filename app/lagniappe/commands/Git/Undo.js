import CommandProcess from 'commands/CommandProcess'

export default class Undo
{

    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            const command = [{
                command: 'git',
                args: ['reset', 'HEAD~'],
                options: { cwd }
            }]
            const process = new CommandProcess(command, () => {})
            process.execute().then(()  => resolve() )
                             .catch(() => reject() )
        })
    }

}
