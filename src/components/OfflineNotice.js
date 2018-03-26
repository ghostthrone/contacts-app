import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { View, Text, Icon } from '@shoutem/ui';
import { func } from 'prop-types';

const style = {
	container: {
		height: 40,
		backgroundColor: '#b52424',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: 'white'
	}
}

export default class OfflineNotice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConnected: true
		}
	}

	static propTypes = {
		onConnectionChange: func
	}

	static defaultProps = {
		onConnectionChange: () => null
	}

	handleConnectionChange = isConnected => {
		this.setState({ isConnected });
		this.props.onConnectionChange(isConnected);
	}

	componentDidMount = async () => {
		const isConnected = await NetInfo.isConnected.fetch();
		if (this.state.isConnected !== isConnected)
			this.handleConnectionChange(isConnected);
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
	}

	componentWillUnmount = () =>
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);

	render = () => {
		if (!this.state.isConnected)
			return (
				<View style={style.container}>
					<Icon name="error" style={style.text} />
					<Text style={style.text}> Sin Conexión a Internet</Text>
				</View>
			);
		else
			return null;
	}
}