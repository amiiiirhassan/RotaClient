const phoneNumber = (state = "", action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER_PHONENUMBER':
            if (action.phoneNumber) {
              return action.phoneNumber
            }
            return state
        default:
            return state
    }
}
  
  export default phoneNumber