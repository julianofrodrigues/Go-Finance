import React from "react";
import { Container, Header, TitleLogo, Title, TitleWrapper, SignInTitle, Footer, FooterWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'; 
import GoogleSvg from '../../assets/google.svg'; 
import LogoSvg from '../../assets/logo.svg'; 
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";
import * as Google from 'expo-auth-session/providers/google';

export function SignIn(){
    const { user, signInWithGoogle, signInWithApple } = useAuth();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '564552719707-ifhh8lohalc6baih6l6l7bv43nl2c3o1.apps.googleusercontent.com',
        expoClientId: '564552719707-kn9hpr5112a69nd3v33not9j9k6decdv.apps.googleusercontent.com',
        iosClientId: '564552719707-sj87qfed8352cj3lfjiqf8oiirmumcq5.apps.googleusercontent.com', 
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          }
      }, [response]);

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar com a conta Google')
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar com a conta Apple')
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)} />
                    <TitleLogo>GoFinances</TitleLogo>
                    <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
                </TitleWrapper>
                <SignInTitle>Faça o seu Login com {'\n'}  uma das contas abaixo</SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={() => promptAsync()} />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}