import { spawn } from 'child_process'

export default class CommandProcess
{
    /**
     * A command is created by passing in an object with the signature of node's
     * child_process.spawn method:
     *
     * https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
     *
     * {
     *  id <String> Short identifier for the command. Used for running multiple commands. (Default: '')
     *  command <String> The command to run
     *  args <Array> List of string arguments
     *  options <Object>
     *      cwd <String> Current working directory of the child process
     *      env <Object> Environment key-value pairs
     * }
     *
     * Pass in an array of these commands to run multiple commands at once.
     *
     * The second command is a callback that handles all data passed back from
     * the command. Your function will be like:
     *
     * function(data, error, finished = false) {
     *     console.log(data)
     * }
     */

    constructor(commands, callback)
    {
        this.commands = commands.length ? commands : [commands]
        this.callback = callback
        this.execute = this.execute.bind(this)
    }

    execute()
    {
        return new Promise((resolve, reject) => {
            let runningCommands = 0

            this.commands.forEach(command => {

                runningCommands++

                const process = spawn(command.command, command.args, command.options)
                const signature = command.id ? command.id : command.command

                process.stdout.on('data', data => {
                    data = data + ''
                    data = this.addSignature(command, data)
                    this.callback(data, false, false)
                })

                process.stderr.on('data', data => {
                    data = data + ''
                    data = this.addSignature(command, data)
                    this.callback(data, true, false)
                })

                process.on('close', (code) => {
                    runningCommands--
                    const finished = runningCommands > 0 ? false : true
                    this.callback(`${signature}: Process exited with code ${code}`, !code, finished)
                    if(finished) {
                        resolve()
                    }
                })

            })
        })
    }

    addSignature(command, data)
    {
        if(!command.id) return data
        const lines = data.split('\n')
        const signature = command.id + ': '
        const newLines = lines.map(line => signature + line)
        return newLines.join('\n')
    }

}
