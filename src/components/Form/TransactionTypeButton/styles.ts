import styled, { css } from "styled-components/native";
import {  RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'


interface IconProps{
    type: 'up' | 'down';
}

interface ContainerProps{
    isActivity: boolean;
    type: 'up' | 'down';

}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    border-width: ${({ isActivity }) => isActivity ? 0 : 1.5}px; 
    border-style: solid;
    border-color: ${({theme}) => (theme.colors.text)};
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    justify-content: center;

    ${({ isActivity, type }) => isActivity && type === 'up' && css`background-color: ${({theme}) => (theme.colors.sucess_light)};`}
    ${({ isActivity, type }) => isActivity && type === 'down' && css`background-color: ${({theme}) => (theme.colors.attention_light)};`}


`;

export const Icon = styled(Feather)<IconProps>`
    ${({ type }) => type === 'up' && css`color: ${({theme}) => (theme.colors.sucess)};`}
    ${({ type }) => type === 'down' && css`color: ${({theme}) => (theme.colors.attention)};`}
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
`;

export const Title = styled.Text`
    color: ${({theme}) => (theme.colors.text_dark)};
    font-family: ${({theme}) => (theme.fonts.medium)};
    font-size: ${RFValue(14)}px;
`;