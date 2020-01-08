import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

const firstReducer = (state = {}, action) => {
	switch (action.type) {
		case "firstAction":
			return {
				...state,
				count: state.count + 1
			}
		default:
			return state
	}
}

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		firstReducer: firstReducer
	})

export default createRootReducer
