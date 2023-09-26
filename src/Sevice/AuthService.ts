import { AUTH_DATA_JWT, LOCAL_STORAGE_ITEM_USER } from "../Config/service-config";
import { AccountData } from "../Model/Auth/AccountData";
import { LoginData } from "../Model/Auth/LoginData";
import { UserData } from "../Model/Auth/UserData";


export default class AuthService {

     private URL:string;

    constructor(url:string) {
        this.URL = url;
    }

    async login(loginData:LoginData):Promise<UserData|null>{
        let responseLogin:UserData|null = null 
        try {
            const response = await fetch(this.URL + '/login',{
                method:"POST",
                headers:{
                    'Content-type':"application/json"},
                body:JSON.stringify(loginData)
            })

        if (response.status != 400){
            const data = await response.json();
            const jwt = data.accessToken;
            localStorage.setItem(AUTH_DATA_JWT,jwt);
            const jwtPayloadJson = atob(jwt.split('.')[1])
            const userData = JSON.parse(jwtPayloadJson);
            responseLogin = {username:userData.sub, role:userData.roles.includes("ADMIN")? "admin" : "authorized"};
            localStorage.setItem(LOCAL_STORAGE_ITEM_USER,JSON.stringify(responseLogin))
        
        } 

    } catch (error) {
        
    } finally{
        return responseLogin
    }
      
    }

    logout(){
        localStorage.removeItem(AUTH_DATA_JWT);
        localStorage.removeItem(LOCAL_STORAGE_ITEM_USER);

    }

    async signUp(account:AccountData):Promise<AccountData|null>{
        let responseAccount: AccountData|null = null;
        try {
            const response = await fetch(this.URL + '/signup',{
                method:"POST",
                headers:{
                    'Content-type':"application/json"},
                body:JSON.stringify(account)
            })
            responseAccount = await response.json()

        } catch (error) {
            
        } finally {
            return responseAccount;
        }

    }
}