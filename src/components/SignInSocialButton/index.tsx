import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Title } from "./styles";

interface Props extends TouchableOpacityProps{
    title: string,
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props){
    return(
        <Button { ...rest } >
            <ImageContainer>
                <Svg width={RFValue(30)} height={RFValue(30)} />
            </ImageContainer>
            <Title>{ title }</Title>
        </Button>
    )
}