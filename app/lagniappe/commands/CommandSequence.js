import CommandProcess from './CommandProcess'
import CommandWindow from './CommandWindow'

// This class accepts an array of CommandSequence and executes them one after
// another. This allows you to run commands in a similar fashion to using the
// command chaining operator in bash (&&), but even more powerful.
//
// You can, for instance, have 3 commands that run simultaneously; then when they
// finish, run 4 others; when they finished, run one more.
//
// Pass in an array CommandProcess objects and call the execute() method.

export default class CommandSequence
{

    constructor(commands, callback = null)
    {
        this.commands = commands.length ? commands : [commands]
        this.execute = this.execute.bind(this)

        // This turns the array you pass in into individual CommandProcess objects
        // if you pass in a callback. Otherwise, this class will assume that you're
        // handling the callback stuff yourself
        if(typeof callback == 'function') {
            this.callback = callback
            let processedCommands = []
            this.commands.forEach(command => {
                processedCommands.push(new CommandProcess(command, callback))
            })
            this.commands = processedCommands
        }
    }

    execute()
    {
        let promise = Promise.resolve()
        this.commands.forEach(command => {
            // Add each sequence a promise chain
            promise = promise.then(command.execute)
        })
        return promise
    }

}
