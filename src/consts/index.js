const developMode = true;
export const ApiUrl = () => {
    if(developMode) {
     return "http://832049ac.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}