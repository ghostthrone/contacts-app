import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScrollView } from 'react-native';
import { Screen, View, NavigationBar, Icon, Button, Row, Text } from '@shoutem/ui';

import ContactIcon from '../components/ContactIcon';
import { resetCurrentContact } from '../redux/modules/contacts';

const mapStateToProps = state => ({
	contact: state.currentContact
});

const mapDispatchToProps = dispatch => ({
	resetCurrentContact: compose(dispatch, resetCurrentContact)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactDetailScreen extends Component {

	handleBack = () => {
		this.props.navigator.dismissModal();
		this.props.resetCurrentContact();
	}

	render = () => {
		const { name, email, phone } = this.props.contact || { name: '', email: '', phone: '' };
		return (
			<Screen>
				<View style={{
					backgroundColor: '#000',
					height: 70
				}}>
					<NavigationBar
						title='Detalle Contacto'
						styleName='clear'
						leftComponent={(
							<Button onPress={this.handleBack}>
								<Icon name='down-arrow' style={{ color: 'white' }} />
							</Button>
						)}
					/>
				</View>
				<ScrollView>
					<ContactIcon />
					<View style={{ margin: 20 }}>
						<Row styleName="small">
							<Icon name="user-profile" />
							<Text>{ name }</Text>
						</Row>
						{(email || null) && <Row styleName="small">
							<Icon name="web" />
							<Text>{ email }</Text>
						</Row>}
						<Row styleName="small">
							<Icon name="call" />
							<Text>{ phone }</Text>
						</Row>
						<Button styleName='full-width' style={{ marginTop: 10, backgroundColor: 'black' }} onPress={this.handleBack}>
							<Text style={{ color: 'white' }}>
								OK
							</Text>
						</Button>
					</View>
				</ScrollView>
			</Screen>
		);
	}
}