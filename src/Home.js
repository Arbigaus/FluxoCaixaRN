import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import firebase from './FirebaseConnection';

export default class Home extends Component {
	static navigationOptions = {
		title:null,
		header:null
	}

	constructor(props) {
	  super(props);	
	  this.state = {
	  	valorTotal:''
	  };

	  rootRef = firebase.database().ref();
	  usersRef = rootRef.child('users');

	  usersRef.on('value',(snapshot)=>{
	  	let state = this.state;
	  	state.valorTotal = '';

	  	snapshot.forEach((r)=>{
	  		let valor = r.val().saldo;
	  		valor += parseFloat(valor);
	  		state.valorTotal = valor.toFixed(2);
	  	});

	  	this.setState(state);

	  });

	  this.cadastrar = this.cadastrar.bind(this);
	  this.login = this.login.bind(this);

	}

	cadastrar(){
		this.props.navigation.navigate('Cadastro');
	}

	login(){
		this.props.navigation.navigate('Login');
	}


	render(){
		return(
			<ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg}>
				<View style={styles.container}>
					<Text style={styles.title} >Fluxo de Caixa v1.0</Text>
					<View style={styles.buttonArea}>
						<TouchableHighlight underlayColor={'#CCCCCC'} style={styles.button} onPress={this.cadastrar} >
							<Text style={styles.btnText} >Cadastrar</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor={'#CCCCCC'} style={styles.button} onPress={this.login} >
							<Text style={styles.btnText} >Login</Text>
						</TouchableHighlight>
					</View>
					<View>
						<Text style={styles.msg}>Já estamos gerenciando</Text>
						<Text style={styles.valor}>R$ {this.state.valorTotal}</Text>
					</View>
				</View>
			</ImageBackground>

		);
	}
}

const styles = StyleSheet.create({
	bg:{
		flex:1,
		width:null
	},
	container:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title:{
		fontSize: 30,
		backgroundColor: 'transparent',
		color: '#000000'
	},
	buttonArea:{
		marginTop: 30
	},
	button:{
		justifyContent: 'center',
		backgroundColor: '#BFB300',
		margin: 10,
		height: 40,
		width: 200
	},
	btnText:{
		color: 'white',
		textAlign: 'center'
	},
	msg:{
		fontSize: 13,
		textAlign: 'center',
		color: '#000000'
	},
	valor:{
		fontSize: 20,
		textAlign: 'center',
		color: '#000000'
	}
});