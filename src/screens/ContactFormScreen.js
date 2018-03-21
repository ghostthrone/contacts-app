import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Screen,
	NavigationBar,
	Subtitle,
	View,
	ListView,
	Icon,
	Row,
	Text,
	Button,
	TextInput
} from '@shoutem/ui';
import { ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectPlatform, requestStatus } from '../utils/common';
import ContactIcon from '../components/ContactIcon';
import { addContact } from '../redux/modules/contacts';
import { NotificationScreen } from '../screens/constants';

const textInputMargins = {
	marginLeft: 20,
	marginRight: 20,
	marginTop: 10,
	marginBottom: 10
};

const mapStateToProps = state => ({
	contact: state.currentContact,
	addContactStatus: state.addContactStatus
});

const mapDispatchToProps = dispatch => ({
	addContact: compose(dispatch, addContact)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactFormScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			email: '',
			phone: ''
		}

		this.nameInput = null;
		this.emailInput = null;
		this.phoneInput = null;
	}

	showNotificationError = errorMessage =>
		this.props.navigator.showInAppNotification({
			screen: NotificationScreen,
			passProps: {
				text: errorMessage,
				containerStyle: {
					backgroundColor: '#EF5350'
				},
				renderIcon: () => <Icon name='error' style={{ color: 'white' }} />
			},
			autoDismissTimerSec: 2
		});

	handleBack = () => this.props.navigator.dismissModal();

	handleButtonPress = () => {
		const { name, email, phone } = this.state;
		let hadError = false;

		if (!name) {
			this.showNotificationError('El nombre no puede estar vacío');
			this.nameInput.focus();
			hadError = true;
			return;
		}

		if (name && name.length > 0 && name.length < 3) {
			this.showNotificationError('El nombre debe contener mínimo 3 caracteres');
			this.nameInput.focus();
			hadError = true;
			return;
		}

		if (email && !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
			this.showNotificationError('Ingrese un email válido');
			this.emailInput.focus();
			hadError = true;
			return;
		}

		if (!phone) {
			this.showNotificationError('El telefono no puede estar vacío');
			this.phoneInput.focus();
			hadError = true;
			return;
		}

		if(phone && !/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g.test(String(phone))) {
			this.showNotificationError('Ingrese un telefono válido');
			this.phoneInput.focus();
			hadError = true;
			return;
		}

		if(phone && String(phone).length < 7) {
			this.showNotificationError('El telefono debe tener mínimo 7 dígitos');
			this.phoneInput.focus();
			hadError = true;
			return;
		}

		if (!hadError)
			this.props.addContact({ name, email, phone });
	}

	componentDidMount = () => {
		const { contact } = this.props;
		if (contact !== null)
			this.setState({ ...contact });
	}

	componentWillReceiveProps = nextProps => {
		switch(nextProps.addContactStatus) {
			case requestStatus.SUCCESS:
				this.props.navigator.dismissModal();
				break;
			case requestStatus.FAILED:
				this.showNotificationError('No se pudo guardar el contacto');
				break;
		}
	}

	render = () => {
		const isEditing = this.props.contact !== null;
		return (
			<Screen>
				<View style={{
					backgroundColor: '#000',
					height: 70
				}}>
					<NavigationBar
						title={isEditing ? 'Editar Contacto' : 'Nuevo Contacto'}
						styleName='clear'
						leftComponent={(
							<Button onPress={this.handleBack}>
								<Icon name='down-arrow' style={{ color: 'white' }} />
							</Button>
						)}
					/>
				</View>
				<ScrollView keyboardShouldPersistTaps='always'>
					<ContactIcon />
					<View>
						<TextInput
							onChangeText={name => this.setState({ name })}
							placeholder='Nombre'
							style={textInputMargins}
							value={this.state.name}
							autoCorrect={false}
							autoFocus={true}
							autoCapitalize='words'
							onSubmitEditing={ev => this.emailInput.focus()}
							inputRef={input => this.nameInput = input}
						/>
						<TextInput
							onChangeText={email => this.setState({ email })}
							placeholder='Email'
							style={textInputMargins}
							value={this.state.email}
							keyboardType='email-address'
							autoCorrect={false}
							autoCapitalize='none'
							inputRef={input => this.emailInput = input}
							onSubmitEditing={ev => this.phoneInput.focus()}
						/>
						<TextInput
							onChangeText={phone => this.setState({ phone })}
							placeholder='Telefono'
							style={textInputMargins}
							value={this.state.phone}
							keyboardType='phone-pad'
							inputRef={input => this.phoneInput = input}
							onSubmitEditing={ev => Keyboard.dismiss()}
						/>
						<Button styleName='full-width' style={{ ...textInputMargins, backgroundColor: 'black' }} onPress={this.handleButtonPress}>
							<Text style={{ color: 'white' }}>
								{isEditing ? 'GUARDAR' : 'CREAR'}
							</Text>
						</Button>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}