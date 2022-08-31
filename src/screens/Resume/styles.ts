import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import {  getBottomSpace } from "react-native-iphone-x-helper";
import { Feather } from '@expo/vector-icons';



export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => (theme.colors.background)};  
`;

export const Header = styled.View`
    background-color: ${({theme}) => (theme.colors.primary)};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    color: ${({theme}) => (theme.colors.shape)};
    font-family: ${({theme}) => (theme.fonts.regular)};
    font-size: ${RFValue(18)}px;
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity`
    
`;

export const MonthSelectIcon = styled(Feather)`
    color: ${({theme}) => (theme.colors.text_dark)};
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    color: ${({theme}) => (theme.colors.text_dark)};
    font-family: ${({theme}) => (theme.fonts.regular)};
    font-size: ${RFValue(20)}px;
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const ResumeList = styled.View`
    flex: 1;
    padding: 0 24px;
    
`;

export const ResumeCard = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: getBottomSpace() },
})``;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;  
`

