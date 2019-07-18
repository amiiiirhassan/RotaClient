import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './reducer/index'
import App from './components/App'
import { InitialState } from './consts/index'
const store = createStore(
   reducer,InitialState
)
store.subscribe(()=>{
  console.log(store.getState());
})
const Main = () => {
   return (
     <Provider store={store}>
       <App />
     </Provider>
   )
 }
 
 export default Main