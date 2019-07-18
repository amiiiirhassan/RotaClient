const developMode = false;
export const ApiUrl = () => {
    if(developMode) {
     return "http://0e78adac.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}