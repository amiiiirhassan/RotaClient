const developMode = false;
export const ApiUrl = () => {
    if(developMode) {
     return "http://e773a8e6.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}