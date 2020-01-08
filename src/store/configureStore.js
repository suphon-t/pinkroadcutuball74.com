import { createBrowserHistory } from "history"
import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import createRootReducer from "./reducers"
import thunk from "redux-thunk"

export const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default function configureStore(preloadedState = initialState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  )
  return store
}
