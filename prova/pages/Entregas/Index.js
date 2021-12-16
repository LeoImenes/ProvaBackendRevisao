import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from './Style';

export default function Entregas({navigation, route }) {
    const [dados, setDados] = useState([]);

    const { id } = route.params;

    useEffect(() => {
        let url = "http://10.87.202.131:3000/entregas/entregadores/"+id;

        fetch(url)
        .then(resp => { return resp.json(); })
        .then(data => { setDados(data); })
    }, []);
    console.log(dados)
    return(
        
        <View>
            {dados.map((item, index) =>
                <TouchableOpacity key={index} onPress={() => { navigation.navigate("Detalhes",{cliente:item.cliente, produto:item.produto, valor:item.valor, entrega:item.id_entrega}) }} >
                    <Text>{item.endereco}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}