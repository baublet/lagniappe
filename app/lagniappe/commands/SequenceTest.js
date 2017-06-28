import CommandProcess from './CommandProcess'
import CommandSequence from './CommandSequence'
import CommandWindow from './CommandWindow'

export default class SequenceTest
{

    execute()
    {
        const s = [{
            command: 'git',
            args: ['status']
        },
        {
            command: 'echo',
            args: ['"One"']
        },
        {
            command: 'echo',
            args: ['"Two"']
        },
        {
            command: 'echo',
            args: ['"Three"']
        }]

        const window = new CommandWindow('Multiple Commands')
        const sequence = new CommandSequence(s, window.callback)

        return sequence.execute()
    }

}
