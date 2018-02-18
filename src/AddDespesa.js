import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import firebase from './FirebaseConnection'

export default class AddDespesa extends Component {
	static navigationOptions = {
		title:"Adicionar Despesa",
		headerStyle:{
			backgroundColor: 'red'
		}
	}

	constructor(props) {
	  super(props);	
	  this.state = {
	  	valor:''
	  };	 	


	  this.remover = this.remover.bind(this);
	}

	remover(){
		if(this.state.valor != '') {

			let historico = firebase.database().ref('historico').child(firebase.auth().currentUser.uid);
			let databaseUser = firebase.database().ref('users').child(firebase.auth().currentUser.uid);

			//TODO: Adicionando no Histórico
			let key = historico.push().key;

			historico.child(key).set({
				type:'despesa',
				valor:this.state.valor
			});

			//TODO: Atualizando o saldo
			databaseUser.once('value').then((snapshot)=>{

				let saldo = parseFloat(snapshot.val().saldo);
				saldo -= parseFloat(this.state.valor);

				databaseUser.set({
					saldo:saldo
				});

				this.props.navigation.goBack();

			});

		}
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>Informe o valor a retirar</Text>
				<TextInput
					underlineColorAndroid='red'
					style={styles.input}
					keyboardType="numeric"
					value={this.state.valor}
					onChangeText={(valor)=>this.setState({valor})}
					autoFocus={true}
				/>
				<Button color="red" title="Remover" onPress={this.remover} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin: 10
	}
});