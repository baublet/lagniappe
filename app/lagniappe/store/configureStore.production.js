import { createStore, applyMiddleware, compose } from 'redux'
import thunk                                     from 'redux-thunk'
import { hashHistory }                           from 'react-router'
import { routerMiddleware, push }                from 'react-router-redux'
import createLogger                              from 'redux-logger'
import rootReducer                               from 'lagniappe/reducers'
import * as commandActions                       from 'lagniappe/actions/command'
import type { defaultCommandState }              from 'lagniappe/reducers/command'

const actionCreators = {
  ...commandActions,
  push,
}

const router = routerMiddleware(hashHistory)

const enhancer = compose(
  applyMiddleware(thunk, router)
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  return store
}
