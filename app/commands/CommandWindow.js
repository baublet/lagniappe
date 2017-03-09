import { store } from '../index.js'
import { addWindow, addLines, finishWindow } from '../actions/command'

export default class CommandWindow
{

    constructor(title)
    {
        this.id = this.guid()
        this.title = title
        store.dispatch( addWindow(this.id, this.title) )
        this.callback = this.callback.bind(this)
    }

    callback(data, error, finished = false)
    {
        const lines = data.split('\n')
        this.addLinesToWindow(lines)
        if(finished) this.finishWindow()
    }

    addLinesToWindow(lines)
    {
        store.dispatch( addLines(this.id, lines) )
    }

    finishWindow()
    {
        store.dispatch( finishWindow(this.id) )
    }

    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4()
    }

}
