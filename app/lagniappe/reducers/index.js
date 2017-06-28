import { combineReducers }          from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import command                      from './command'
import watcher                      from './watcher'

const rootReducer = combineReducers({
  command,
  watcher,
  routing
})

export default rootReducer
