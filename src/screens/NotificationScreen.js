import React from 'react';
import { View, Text } from '@shoutem/ui';

const style = {
	container: {
		backgroundColor: 'black',
		padding: 24,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: 'white',
		textAlign: 'center'
	}
};

const NotificationScreen = props => (
	<View style={{ ...style.container, ...props.containerStyle }}>
		{props.renderIcon()}
		<Text style={{ ...style.text, ...props.textStyle }}>{` ${props.text}`}</Text>
	</View>
);

NotificationScreen.defaultProps = {
	containerStyle: {},
	textStyle: {},
	renderIcon: () => null
}

export default NotificationScreen;