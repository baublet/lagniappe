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

    constructor(command, callback)
    {
        this.commands = command.isArray && command.isArray() ? command : [command]
        this.callback = callback
    }

    execute()
    {
        let runningCommands = 0

        this.commands.forEach(command => {

            runningCommands++

            const spawn = require('child_process').spawn
            const ls = spawn(command.command, command.args, command.options)
            const signature = command.id ? command.id + ': ' : ''

            ls.stdout.on('data', (data) => {
                this.callback(signature + data, false, false)
            })

            ls.stderr.on('data', (data) => {
                this.callback(signature + data, true, false)
            })

            ls.on('close', (code) => {
                runningCommands--
                this.callback(`Child process ${signature} exited with code ${code}`, !code, !!runningCommands)
            })

        })
    }

}
