import { store } from 'index.js'
import guid      from 'lagniappe/utils/guid'
import { addWindow, addLines, finishWindow } from 'lagniappe/actions/command'

export default class CommandWindow
{

    constructor(title)
    {
        this.id = guid()
        this.title = title
        store.dispatch( addWindow(this.id, this.title) )
        this.callback = this.callback.bind(this)
    }

    callback(data, error, finished = false)
    {
        const lines = data.split('\n')
        this.addLinesToWindow(lines, error)
        if(finished) this.finishWindow()
    }

    addLinesToWindow(lines, error)
    {
        store.dispatch(addLines(this.id, lines, error))
    }

    finishWindow()
    {
        store.dispatch(finishWindow(this.id))
    }

}
