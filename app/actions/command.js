// @flow
import type { counterStateType } from '../reducers/command'

export const ADD_WINDOW = 'command/ADD_WINDOW'
export const ADD_LINE = 'command/ADD_LINE'
export const ADD_LINES = 'command/ADD_LINES'
export const FINISH_WINDOW = 'command/FINISH_WINDOW'
export const REMOVE_WINDOW = 'command/REMOVE_WINDOW'
export const FOCUS_WINDOW = 'command/FOCUS_WINDOW'

export function addWindow(windowId, windowTitle)
{
    return dispatch => {
        dispatch({
            type: ADD_WINDOW,
            payload: {
                windowId,
                windowTitle
            }
        })
    }
}

export function addLines(windowId, lines)
{
    return dispatch => {
        dispatch({
            type: ADD_LINES,
            payload: {
                windowId,
                lines
            }
        })
    }
}

export function focusWindow(windowId)
{
    return dispatch => {
        dispatch({
            type: FOCUS_WINDOW,
            payload: {
                windowId
            }
        })
    }
}

export function finishWindow(windowId)
{
    return dispatch => {
        dispatch({
            type: FINISH_WINDOW,
            payload: {
                windowId
            }
        })
    }
}

export function removeWindow(windowId)
{
    return dispatch => {
        dispatch({
            type: REMOVE_WINDOW,
            payload: {
                windowId
            }
        })
    }
}
