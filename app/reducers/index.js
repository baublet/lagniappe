// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import command from './command'

const rootReducer = combineReducers({
  command,
  routing
})

export default rootReducer
