import * as Keychain from 'react-native-keychain';

export const SaveToken = async (token) => {
    const username = 'token';
    const password = token;
        await Keychain.setGenericPassword(username, password);
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();
            console.log(credentials)
        }
        catch (error) {
            console.log('Keychain couldn\'t be accessed!', error);
        }

} 
export const GetToken = async() => {
    try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            return credentials.password
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
      }
}
