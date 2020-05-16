import { combineReducers} from 'redux'
import {createSession} from './reducers/index'
const allReducers = combineReducers({
    createSession:createSession
})
export default allReducers