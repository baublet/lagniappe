export const SET_WATCHER_DATA = 'watcher/SET_WATCHER_DATA'

export function setWatcherData(name, data)
{
    return dispatch => {
        dispatch({
            type: SET_WATCHER_DATA,
            payload: {
                name,
                data
            }
        })
    }
}
