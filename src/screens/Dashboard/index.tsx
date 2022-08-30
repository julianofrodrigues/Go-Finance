import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionsList, LogoutButton, LoadContainer } from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighLightProps{
    amount: string;
    lastTransaction: string;
}

interface HighLightData{
   entries: HighLightProps;
   expensives: HighLightProps;
   total: HighLightProps
}

export function Dashboard(){
    const [isLoading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>( {} as HighLightData );
     

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
        const lastTransaction = Math.max.apply(Math, collection.filter( transaction => transaction.type === type ).map( transaction => new Date(transaction.date).getTime() ));
        return Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'}).format(new Date(lastTransaction));
    }

    async function loadTransactions(){
        const dataKey ='@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensivesTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            }

            if(item.type === 'negative'){
                expensivesTotal += Number(item.amount)
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            const date = Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(item.date));
            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setTransactions(transactionsFormatted)
        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionsExpensives}`

        const total = entriesTotal - expensivesTotal;
        setHighLightData({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
                lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
            },
            expensives:{
                amount: expensivesTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
                lastTransaction: `Última saída dia ${lastTransactionsExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
                lastTransaction: totalInterval
            }
            
        });
        setLoading(false)
    }

    useEffect( () => { loadTransactions() }, [] )

    useFocusEffect(useCallback( () =>{ loadTransactions() }, [] ))


    return(
        <Container>            
        { 
            isLoading ? 
                <LoadContainer>
                    <ActivityIndicator size="large" />
                </LoadContainer> :
            <>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/46505899?v=4'}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Juliano</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard type="up" title="Entrada" amount={highLightData.entries.amount} lastTransaction={highLightData.entries.lastTransaction} />
                <HighlightCard type="down"  title="Saídas" amount={highLightData.expensives.amount}  lastTransaction={highLightData.expensives.lastTransaction} />
                <HighlightCard type="total"  title="Total" amount={highLightData.total.amount}  lastTransaction={highLightData.total.lastTransaction} />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList   data={transactions} keyExtractor={item => item.id}   renderItem={({ item }) => <TransactionCard data={item}  />} />
            </Transactions>
            </>
        }
        </Container>
    )
}

