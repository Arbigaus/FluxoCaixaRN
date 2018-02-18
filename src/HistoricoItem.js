import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class HistoricoItem extends Component {
	constructor(props) {
	  super(props);
		
		let bg = (this.props.data.type == 'despesa')?bg = "#FF0000" : "#00FF00";
	  this.state = {
	  	bg:bg
	  };
	}

	render() {
		return (
			<View style={[styles.area, {backgroundColor:this.state.bg}]} >
				<Text>{this.props.data.type}</Text>
				<Text>{(this.props.data.type == 'despesa')? 'R$ -'+this.props.data.valor : 'R$ '+this.props.data.valor}</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	area:{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 30,
		paddingLeft: 10,
		paddingRight: 10
	}

});