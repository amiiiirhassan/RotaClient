const initialState = {fullName: "",phoneNumber: "",email: "",height: "",birthday:"",image:"",weight:"",sex:""};
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
                    profileImage: action.currenUser.profileImage,
                    sex: action.currenUser.sex
                }
        default:
            return state
    }
}

export default currentUser