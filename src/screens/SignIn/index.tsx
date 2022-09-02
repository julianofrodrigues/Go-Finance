import React from "react";
import { Container, Header, TitleLogo, Title, TitleWrapper, SignInTitle, Footer, FooterWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'; 
import GoogleSvg from '../../assets/google.svg'; 
import LogoSvg from '../../assets/logo.svg'; 
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";



export function SignIn(){
    const { user, signInWithGoogle } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar com a conta Google')
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
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}