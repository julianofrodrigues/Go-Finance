import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Container, Fields, Form, Header, Title, TransactionTypes } from "./styles";

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionTypes>
                        <TransactionTypeButton type="up" title="Income" onPress={() => handleTransactionTypeSelect('up')} isActivity={transactionType === 'up'} />
                        <TransactionTypeButton type="down" title="Outcome" onPress={() => handleTransactionTypeSelect('down')} isActivity={transactionType === 'down'}  />
                    </TransactionTypes>
                    <CategorySelect title="Categoria"/>
                </Fields>
                <Button title="Enviar" />
            </Form>
        </Container>
    )
}