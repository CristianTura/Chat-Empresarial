import { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../Helpers/fetch";

export const AuthContext = createContext();

const initialState ={
    uid:null,
    checking:true,
    logged:false,
    name:null,
    email:null,
    typeUser:null
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initialState);

    const login = async(email, password)=>{
        const res = await fetchSinToken('login',{email, password},'POST')

        if(res.ok){
            localStorage.setItem('token', res.token);
            const {user} = res;
            // console.log(user)
            setAuth({
                uid:user.uid,
                checking:false,
                logged:true,
                name:user.name,
                email:user.email,
                typeUser:user.typeUser
            });
            console.log('Autenticated')
        }
        return res.ok
    }
    const register = async(name, email,password,typeUser)=>{
        const res = await fetchSinToken('login/new',{email, password, name, typeUser },'POST')
        // console.log(res)
        if(res.ok){
            localStorage.setItem('token', res.token);
            const {user} = res;
            // console.log(user)
            setAuth({
                uid:user.uid,
                checking:false,
                logged:true,
                name:user.name,
                email:user.email,
                typeUser:user.typeUser
            });
            console.log('Autenticated')
            return true;
        }
        return res.msg;
    }
    const verificaToken= useCallback(async()=>{
        const token = localStorage.getItem('token');
//token no exist
        if(!token){
            setAuth({
                uid:null,
                checking:false,
                logged:false,
                name:null,
                email:null,
                typeUser:null
            })
            return false;
        }
        const res = await fetchConToken('login/renew');
        if(res.ok){
            localStorage.setItem('token', res.token);
            const {user} = res;
            // console.log(user)
            setAuth({
                uid:user.uid,
                checking:false,
                logged:true,
                name:user.name,
                email:user.email,
                typeUser:user.typeUser
            });
            console.log('Autenticated')
            return true;
        }else{
            setAuth({
                checking:false,
                logged:false,

            });
            return false;
        }
    },[]);
    const logout = ()=>{
        localStorage.removeItem('token');
        setAuth({
            checking:false,
            logged:false,
        });
        
    }
    return (
        <div>
            <AuthContext.Provider value={{
                auth,
                login,
                register,
                verificaToken,
                logout
            }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
