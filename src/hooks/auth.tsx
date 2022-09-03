import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProviderProps{
    children: ReactNode;
};

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
};

interface AuthContextData{
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>
};

const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps){
    const [ user, setUser ] = useState<User>({} as User);
    const [ userStorageLoading, setUserStorageLoading ] = useState(true)
    const userStorageKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const result = await Google.logInAsync({
                androidClientId: '564552719707-ifhh8lohalc6baih6l6l7bv43nl2c3o1.apps.googleusercontent.com',
                iosClientId: '564552719707-sj87qfed8352cj3lfjiqf8oiirmumcq5.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            console.log(result)

            if(result.type === 'success'){
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                };
                console.log(userLogged)
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error(error)
        }
    }
   
    
    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: undefined
                };
                
                console.log(userLogged)
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStorage = await AsyncStorage.getItem(userStorageKey);
            if(userStorage){
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false)
        }

        loadUserStorageData()
    }, [])
    

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
           { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }

