import React, { createContext, ReactNode, useContext, useState } from "react";
import * as Google from 'expo-google-app-auth';
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

async function signInWithGoogle() {
    try {
        const result = await Google.logInAsync({
            androidClientId: '564552719707-ifhh8lohalc6baih6l6l7bv43nl2c3o1.apps.googleusercontent.com',
            iosClientId: '564552719707-sj87qfed8352cj3lfjiqf8oiirmumcq5.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });
        if(result.type === 'success'){
            const userLogged = {
                id: String(result.user.id),
                email: result.user.email!,
                name: result.user.name!,
                photo: result.user.photoUrl!
            };
            console.log(userLogged)
            setUser(userLogged);
            await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))
        }
    } catch (error) {
        throw new Error(error)
    }
}

interface AuthContextData{
    user: User;
    signInWithGoogle(): Promise<void>
};

const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps){
    const [user, ] = useState<User>({} as User)

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
           { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }

