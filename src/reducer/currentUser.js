const initialState = {fullName: "",phoneNumber: "",email: "",height: "",birthday:"",image:"",weight:""};
const currentUser = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
                return {
                    fullName: action.currenUser.fullName,
                    email: action.currenUser.email,
                    birthday: action.currenUser.birthday,
                    weight: action.currenUser.weight,
                    phoneNumber: action.currenUser.phoneNumber,
                    height: action.currenUser.height,
                    image: action.currenUser.image
                }
        default:
            return state
    }
}

export default currentUser