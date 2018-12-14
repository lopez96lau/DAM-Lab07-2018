import React, { Component } from 'react';
import {
    ToastAndroid, Button, StyleSheet, Text, TextInput, Picker, View,
    Switch, CheckBox, Slider
} from 'react-native';
export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda: 1,
            capitalInicial: 0,
            capitalFinal: 0,
            dias: 10,
            mail: 1,
            cuit: 1,
            tasa: 0,
            checked: false,
            mail: false
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
    }
    
    hacerPlazoFijo() {
        if(this.state.checked){
            if(this.state.capitalInicial>0 && this.state.capitalInicial<5000){
                if(this.state.dias<30) tasa = 25;
                else tasa = 27.5;
            } else if(this.state.capitalInicial<100000){
                if(this.state.dias<30) tasa = 30;
                else tasa = 32.3;
            } else {
                if(this.state.dias<30) tasa = 35;
                else tasa = 38.5;
            }
        } else {
            ToastAndroid.show('Debe aceptar los términos y condiciones', ToastAndroid.LONG);
            tasa = 0;
        }
        aux = Math.pow(1+(tasa/100),this.state.dias/360);
        interes = this.state.capitalInicial*(aux-1);
        interes = interes.toFixed(2);
        return interes;
    }

    onPress = () => {
        this.setState({
            capitalFinal: this.hacerPlazoFijo()
        })
    }

    render() {
        return (

            <View style = {styles.container}>
                <Text style={styles.header}>Banco Online</Text>

                <Text></Text>

                <Text style={styles.titulo}>Correo Electrónico</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="correo@mail.com"
                        placeholderTextColor="grey"
                        onChangeText={(valor) => this.setState({mail:valor})}
                    />
                </View>

                <Text></Text>

                <Text style={styles.titulo}>CUIT/CUIL</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="00-00000000-0"
                        placeholderTextColor="grey"
                        onChangeText={(valor) => this.setState({cuit:valor})}
                    />
                </View>
               
                <Text></Text>

                <Text style={styles.titulo}>Moneda</Text>
                <View style={styles.textAreaContainer}>
                    <Picker
                        style={{ width: 250, margin: 5 }}
                        selectedValue={this.state.moneda}
                        onValueChange={(valor) => this.setState({ moneda: valor })}>
                        <Picker.Item label="Dolar" value="1" />
                        <Picker.Item label="Pesos ARS" value="2"/>
                    </Picker>
                </View>
                
                <Text></Text>

                <Text style={styles.titulo}>Monto</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="0"
                        placeholderTextColor="grey"
                        onChangeText={(valor) => this.setState({capitalInicial:valor})}
                    />
                </View>
                
                <Text></Text>

                <Text style={styles.titulo}>Días</Text>
                <Slider
                    maximumValue={100}
                    minimumValue = {10}
                    style={{ width: 270, fontSize: 15}}
                    step={1}
                    onValueChange={(valor) => this.setState({ dias:valor })}>
                </Slider>
                
                <Text>{this.state.dias} Dias</Text>
                <Text></Text>
                <Text></Text>
                
                <View style={styles.container2}>
                    <Text>Avisar por mail</Text>
                    <Switch
                        value = {this.state.mail}
                        onValueChange = {() => this.setState({ mail: !this.state.mail})}
                    />                
                </View>
                
                <Text></Text>
                <Text></Text>

                <View style={styles.container2}>
                    <CheckBox
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text>Acepto las condiciones</Text>
                </View>
                
                <Text></Text>
                <Text></Text>

                <Button 
                    title="Calcular Plazo Fijo"
                    color="#FF0000"
                    onPress={this.onPress}>
                </Button>
                
                <Text></Text>

                <Text style={styles.monto}> El valor del plazo fijo es de ${this.state.capitalFinal}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
   
    header: {
        fontSize: 40,
        color: '#FF0000',
        fontWeight: 'bold',
        marginTop: 30
    },

    monto: {
        fontSize: 20,
        color: '#FF0000',
        fontWeight: 'bold'
    },
    
    titulo: {
        fontSize: 15,
        fontWeight: 'bold' 
    },
   
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        //padding: 2,
        width: 250,
        borderRadius:30,
    },
    
    textArea: {
        justifyContent: "flex-start",
        textAlign: 'center',
        fontSize: 15
    },

    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
});
