import { SET_WATCHER_DATA } from 'lagniappe/actions/watcher'
import deepcopy             from 'lagniappe/utils/deepcopy'

export const defaultState = {
    // By default, we don't have any watchers
}

export default function watcher (state = null, action) {

    if(!state) state = defaultState

    switch (action.type)
    {

        case SET_WATCHER_DATA:
            const newState = deepcopy(state)
            newState[action.payload.name] = action.payload.data
            return newState

        default:
            return state
    }
}
