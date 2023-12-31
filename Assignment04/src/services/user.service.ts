import axios from 'axios';
import { Subject } from 'rxjs';

const isAuthenticated = new Subject();

export const authState = {
    getState: () => isAuthenticated.asObservable(),
    setState: (state: boolean) => isAuthenticated.next(state)
}

export async function signUp(username: string, password: string) {
    try{
        const response = await axios.post('http://localhost:9090/users', {username, password});
        console.log("Sign up successful: ", response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export async function login(username: string, password: string) {
    try{
        const response = await axios.post('http://localhost:9090/login', {username, password});
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("game", "");
            return response.data;
        }
        console.log("Login failed: ", response.data);
        return null;
    }
    catch(error){
        console.log(error);
    }
}

export async function logout(token : string) {
    try {
      const response = await axios.post(
        `http://localhost:9090/logout?token=${token}`
      );
      console.log('Response for logout: ', response);
      // toast.success('Logout successful!');
      return response.data;
    } catch (error) {
      // toast.error('Logout failed!');
    }
}

export async function getProfile(token : string, userId : number) {
    try {
        const response = await axios.get(
          `http://localhost:9090/users/${userId}?token=${token}`
        );
        console.log('Response for getProfile: ', response);
        return response.data;
      } catch (error) {

      }
}

export async function updateProfile(token : string, userId : number, user : any) {
    try {
        const response = await axios.patch(
          `http://localhost:9090/users/${userId}?token=${token}`,
          user
        );
        console.log('Response for updateProfile: ', response);
        return response.data;
      } catch (error) {

      }
}

export function persistUser(username: string, token: string){
    localStorage.setItem("user", JSON.stringify({username, token}));
}

export function authenticated(){
    const user = localStorage.getItem("user");
    if(user){
        authState.setState(true);
        return true;
    }
    else{
        authState.setState(false);
        return false;
    }
}
