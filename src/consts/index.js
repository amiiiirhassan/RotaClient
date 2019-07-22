const developMode = true;
export const ApiUrl = () => {
    if(developMode) {
     return "http://8e53e9f5.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}