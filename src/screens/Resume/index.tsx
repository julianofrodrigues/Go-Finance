import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { Container, Header, ResumeCard, ResumeList, Title, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer } from "./styles";
import { VictoryPie } from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { useFocusEffect } from "@react-navigation/native";


interface TransactionData {
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: number;
    percentFormatted: string;
}

export function Resume(){
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    function handleChangeDate(action: 'next' | 'prev'){
        setIsLoading(true);
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1))
        }else{
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function loadData() {
        setIsLoading(false);
        const dataKey ='@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter(( expensive : TransactionData ) => expensive.type === 'negative' && new Date(expensive.date).getMonth() === selectedDate.getMonth() && new Date(expensive.date).getFullYear() === selectedDate.getFullYear());
        const expensivesTotal = expensives.reduce(( accumulator: number, expensive: TransactionData ) => { return accumulator + Number(expensive.amount); }, 0)

        const totalByCategory: CategoryData[]  = []

        categories.forEach(category => {
            let categorySum =0;
            expensives.forEach(( expensive : TransactionData ) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if(categorySum > 0){
                const totalFormatted = categorySum.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                const percent = (categorySum / expensivesTotal * 100);
                const percentFormatted = `${percent.toFixed(0)}%`;
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                    percentFormatted
                });
            }
        });
        setTotalByCategories(totalByCategory)
    }

    

    useFocusEffect(useCallback( ()=>{ loadData() },[ selectedDate ] ))

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <MonthSelect>
                <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                    <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>
                <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
                <MonthSelectButton onPress={() => handleChangeDate('next')}>
                    <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
            </MonthSelect>

            {
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator size="large" />
                </LoadContainer> :
                <>
                <ChartContainer>
                    <VictoryPie 
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{ labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: '#FFFFFF' } }}
                        labelRadius={50}
                        x="percentFormatted"
                        y="total"
                    />
                </ChartContainer>

                <ResumeList>
                    <ResumeCard data={totalByCategories} keyExtractor={item => item.key}   renderItem={({ item }) => <HistoryCard title={item.name} amount={item.totalFormatted} color={item.color} />} />
                </ResumeList>
                </>
            }

        </Container>

    )
}