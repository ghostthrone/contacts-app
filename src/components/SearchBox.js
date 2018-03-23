import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Icon } from '@shoutem/ui'

const style = StyleSheet.create({
	container: {
		backgroundColor: '#eeeeee',
		height: 70
	},
	innerContainer: {
		backgroundColor: '#fff',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10,
		borderRadius: 50,
		paddingRight: 10,
		paddingLeft: 10,
		alignItems: 'center'
	}
});

const textInputStyle = { 
	borderRadius: 50, 
	width: '80%', 
	padding: 0, 
	paddingLeft: 10,
	margin: 0
};

const SearchBox = ({ onSearch }) => (
	<View style={style.container}>
		<View style={style.innerContainer}>
			<TextInput onChangeText={onSearch} style={textInputStyle} placeholder='Buscar'/>
			<Icon name="search" />
		</View>
	</View>
);

export default SearchBox;