import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps{
    type: 'up' | 'down',
    title: string,
    isActivity: boolean;
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({ title, type, isActivity, ...rest }: Props){
    return(
        <Container { ...rest } type={type} isActivity={isActivity}>
            <Icon name={icons[type]} type={type} />
            <Title>{ title }</Title>
        </Container>

    )
}