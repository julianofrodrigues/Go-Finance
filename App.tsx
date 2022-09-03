import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }
  return( 
    <ThemeProvider theme={theme}>
          <StatusBar barStyle="light-contentr" />
          <AuthProvider>
            <Routes />
          </AuthProvider>
    </ThemeProvider>
  )
}

