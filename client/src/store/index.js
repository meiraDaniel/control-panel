import { combineReducers} from 'redux'
import {createSession,getId} from './reducers/index'

const allReducers = combineReducers({
    createSession:createSession,
    getId:getId
})
export default allReducers