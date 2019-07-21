const developMode = true;
export const ApiUrl = () => {
    if(developMode) {
     return "http://9f2bdbf7.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}