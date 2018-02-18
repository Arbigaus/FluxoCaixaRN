import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import firebase from './FirebaseConnection'

export default class AddReceita extends Component {
	static navigationOptions = {
		title:"Adicionar Receita",
		headerStyle:{
			backgroundColor: 'green'
		}
	}

	constructor(props) {
	  super(props);	
	  this.state = {
	  	valor:''
	  };	 	


	  this.add = this.add.bind(this);
	}

	add(){
		if(this.state.valor != '') {

			let historico = firebase.database().ref('historico').child(firebase.auth().currentUser.uid);
			let databaseUser = firebase.database().ref('users').child(firebase.auth().currentUser.uid);

			//TODO: Adicionando no Histórico
			let key = historico.push().key;

			historico.child(key).set({
				type:'receita',
				valor:this.state.valor
			});

			//TODO: Atualizando o saldo
			databaseUser.once('value').then((snapshot)=>{

				let saldo = parseFloat(snapshot.val().saldo);
				saldo += parseFloat(this.state.valor);

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
				<Text>Adicionar Valor</Text>
				<TextInput
					underlineColorAndroid='green'
					style={styles.input}
					keyboardType="numeric"
					value={this.state.valor}
					onChangeText={(valor)=>this.setState({valor})}
					autoFocus={true}
				/>
				<Button color="green" title="Adicionar" onPress={this.add} />
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