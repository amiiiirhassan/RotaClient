const developMode = false;
export const ApiUrl = () => {
    if(developMode) {
     return "http://3820ab34.ngrok.io";
    }
    return "https://mysterious-lake-54391.herokuapp.com"
}

export const InitialState = {
    phoneNumber:""
}