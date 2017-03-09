import { ADD_WINDOW, ADD_LINE, ADD_LINES, REMOVE_WINDOW, FINISH_WINDOW, FOCUS_WINDOW } from '../actions/command'
import deepcopy from '../utils/deepcopy'

export const defaultCommandState = {
    windows: []
}

export default function command (state = null, action) {

    if(!state) state = defaultCommandState

    switch (action.type)
    {

        case ADD_WINDOW:
            const addedWindowState = deepcopy(state)
            addedWindowState.windows.forEach( window => window.active = false)
            addedWindowState.windows.push({
                id: action.payload.windowId,
                windowTitle: action.payload.windowTitle,
                active: true,
                finished: false,
                lines: []
            })
            return addedWindowState

        case FINISH_WINDOW:
            const finishWindowState = deepcopy(state)
            finishWindowState.windows.forEach( window => {
                if(window.id !== action.payload.windowId) return
                window.finished = true
            })
            return finishWindowState

        case FOCUS_WINDOW:
            const focusWindowState = deepcopy(state)
            focusWindowState.windows.forEach( window => {
                window.active = false
                if(window.id == action.payload.windowId) window.active = true
            })
            return focusWindowState

        case REMOVE_WINDOW:
            const removeWindowState = deepcopy(state)
            removeWindowState.windows = removeWindowState.windows.filter( window => {
                if(window.id == action.payload.windowId) return false
                return true
            })
            if(removeWindowState.windows.length) removeWindowState.windows[0].active = true
            return removeWindowState

        case ADD_LINES:
            const addLinesState = deepcopy(state)
            addLinesState.windows.forEach( window => {
                if(window.id !== action.payload.windowId) return
                window.lines.push(...action.payload.lines)
            })
            return addLinesState

        default:
            return state
    }
}
