import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Style from './styles';



export default function Detalhes({navigation, route}){
    const {cliente, produto, valor} = route.params
    const {entrega, setEntrega} = useState([])

    const confirmar = () => {
        let {entrega}= route.params
        let url = "http://10.87.202.131:3000/entregas/entregues/" + entrega;
            fetch(url, {
                method: "PUT",
                "headers": { "Content-Type": "application/json" },
            })
                .then(resp => { return resp.status })
                .then(data => { if (data == 200) navigation.navigate('Home') })
        } 
    

    return(
        <View>
        <TouchableOpacity  style={Style.cards}>
                    <Text>{cliente}</Text>
                    <Text >{produto}</Text>
                    <Text>{valor}</Text>
                    <button onClick={confirmar}>Confirmar</button>
        </TouchableOpacity>
        </View>
    )
}
