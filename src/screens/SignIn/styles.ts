import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import {  getBottomSpace } from "react-native-iphone-x-helper";
import { Feather } from '@expo/vector-icons';



export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => (theme.colors.background)};  
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => (theme.colors.primary)};
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 19px;
`;

export const TitleWrapper = styled.View`

    align-items: center;
`;

export const TitleLogo = styled.Text`
    font-family: ${({theme}) => (theme.fonts.medium)};
    color: ${({theme}) => (theme.colors.shape)};
    font-size: ${RFValue(18)}px;
    text-align: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => (theme.fonts.medium)};
    color: ${({theme}) => (theme.colors.shape)};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 35px;
`;

export const SignInTitle = styled.Text`
    color: ${({theme}) => (theme.colors.shape)};
    font-family: ${({theme}) => (theme.fonts.regular)};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;

`;



export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({theme}) => (theme.colors.secondary)};  
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
    
`;