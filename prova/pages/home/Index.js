import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import Style from './Style';


export default function Home({ navigation}) {
    const [entregadores, setEntregadores] = useState([])


    useEffect(() => {
        fetch("http://10.87.202.131:3000/entregas/entregadores", {
            "method": "GET",
            "headers": {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            return resp.json()
        }).then(data => {
            setEntregadores(data)
        }).catch(err => {
        })
    }, [entregadores])
    
    return (
        <View>
            <Text style={Style.header}>Quem É Você?</Text>
            {entregadores.map((item, index) =>
                <TouchableOpacity style={Style.cards} key={index} onPress={() => { navigation.navigate("Entregas",{id:item.id_entregador}) }} >
                    
                    <Text>{item.nome}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}