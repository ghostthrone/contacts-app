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
import { PacmanIndicator as ActivityIndicator } from 'react-native-indicators';

import { selectPlatform, requestStatus } from '../utils/common';
import ContactIcon from '../components/ContactIcon';
import { addContact, resetCurrentContact, updateContact } from '../redux/modules/contacts';
import { NotificationScreen } from '../screens/constants';
import OfflineNotice from '../components/OfflineNotice';

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
	addContact: compose(dispatch, addContact),
	resetCurrentContact: compose(dispatch, resetCurrentContact),
	updateContact: compose(dispatch, updateContact)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactFormScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			email: '',
			phone: '',
			editableInput: true
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

	handleBack = () => {
		this.props.navigator.dismissModal();
		this.props.resetCurrentContact();
	}

	handleConnectionChange = isConnected => this.setState({ editableInput: isConnected });

	handleButtonPress = () => {
		const { name, email, phone } = this.state;
		let hadError = false;
		const isEditing = this.props.contact !== null;

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

		if (phone && !/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g.test(String(phone))) {
			this.showNotificationError('Ingrese un telefono válido');
			this.phoneInput.focus();
			hadError = true;
			return;
		}

		if (phone && String(phone).length < 7) {
			this.showNotificationError('El telefono debe tener mínimo 7 dígitos');
			this.phoneInput.focus();
			hadError = true;
			return;
		}

		if (!hadError) {
			if (!isEditing)
				this.props.addContact({ name, email, phone });
			else
				this.props.updateContact({ id: this.state.id, name, email, phone });
		}
	}

	renderButtons = () => {
		const isEditing = this.props.contact !== null;
		if (this.state.editableInput) {
			if (isEditing)
				return (
					<View styleName="horizontal" style={{ ...textInputMargins }}>
						<Button styleName="confirmation dark" style={{ backgroundColor: 'black', margin: 0 }} onPress={this.handleButtonPress}>
							<Text style={{ color: 'white' }}>GUARDAR</Text>
						</Button>
						<Button styleName="confirmation" style={{ margin: 0 }} onPress={this.handleBack}>
							<Text>REGRESAR</Text>
						</Button>
					</View>
				);
			else
				return (
					<Button styleName='full-width' style={{ ...textInputMargins, backgroundColor: 'black' }} onPress={this.handleButtonPress}>
						<Text style={{ color: 'white' }}>
							CREAR
						</Text>
					</Button>
				);
		} else
			return null;
	}

	renderForm = () => {
		if (this.props.addContactStatus === requestStatus.PENDING)
			return (
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
					<ActivityIndicator color='black' />
				</View>
			);

		return (
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
						editable={this.state.editableInput}
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
						editable={this.state.editableInput}
					/>
					<TextInput
						onChangeText={phone => this.setState({ phone })}
						placeholder='Telefono'
						style={textInputMargins}
						value={this.state.phone}
						keyboardType='phone-pad'
						inputRef={input => this.phoneInput = input}
						onSubmitEditing={ev => Keyboard.dismiss()}
						editable={this.state.editableInput}
					/>
					{this.renderButtons()}
				</View>
			</ScrollView>
		);
	}

	componentDidMount = () => {
		const { contact } = this.props;
		if (contact !== null)
			this.setState({ ...contact });
	}

	componentWillReceiveProps = nextProps => {
		switch (nextProps.addContactStatus) {
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
				<OfflineNotice onConnectionChange={this.handleConnectionChange} />
				{this.renderForm()}
			</Screen>
		);
	}
}