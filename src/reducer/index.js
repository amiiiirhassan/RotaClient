import { combineReducers } from 'redux'
import  phoneNumber  from './phoneNumber'
import currentUser from './currentUser'

 const RotaStates = combineReducers({
   phoneNumber,
   currentUser
 })
 export default RotaStates;