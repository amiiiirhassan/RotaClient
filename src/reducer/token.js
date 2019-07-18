const initialTOKEN = "";
  
  const token = (state = initialTOKEN, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token
        case 'REMOVE_TOKEN' :
            return initialTOKEN
      default:
        return state
    }
  }
  
export default token