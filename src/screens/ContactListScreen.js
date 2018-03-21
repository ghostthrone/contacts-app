import React, { Component } from "react";
import { Dimensions, Platform, StatusBar } from 'react-native'
import { 
	Screen, 
	NavigationBar, 
	Title, 
	View, 
	ListView, 
	Icon,
	Row,
	Text
} from "@shoutem/ui";
import { connect } from 'react-redux';
import { compose } from 'redux';
import ActionButton from 'react-native-action-button';
import { PacmanIndicator } from 'react-native-indicators';

import SearchBox from '../components/SearchBox';
import { ContactFormScreen } from '../screens/constants';
import { selectPlatform, requestStatus } from '../utils/common';
import { resetCurrentContact, fetchContacts, removeContact, setCurrentContact } from '../redux/modules/contacts';
import SwipeableSectionList from '../components/SwipeableSectionList';

const mapStateToProps = state => ({
	contacts: state.contacts,
	fetchContactsStatus: state.fetchContactsStatus
});

const mapDispatchToProps = dispatch => ({
	resetCurrentContact: compose(dispatch, resetCurrentContact),
	fetchContacts: compose(dispatch, fetchContacts),
	removeContact: compose(dispatch, removeContact),
	setCurrentContact: compose(dispatch, setCurrentContact)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ContactListScreen extends Component {
	showFormContactModal = () => 
		this.props.navigator.showModal({
			screen: ContactFormScreen,
			navigatorStyle: {
				statusBarColor: 'black',
				statusBarTextColorScheme: 'ligth',
				navBarHidden: true,
				drawUnderNavBar: true,
				orientation: 'auto',
			}
		});

	handleNewContact = () => {
		this.props.resetCurrentContact();
		this.showFormContactModal();
	}

	handleEditItem = id => {
		const { contacts } = this.props;
		const contact = contacts.find(contact => contact.id === id);
		if(contact !== undefined) {
			this.props.setCurrentContact(contact);
			this.showFormContactModal();
		}
	}

	handleRemoveItem = id => this.props.removeContact(id);

	renderListView = () => {
		const { contacts, fetchContactsStatus } = this.props;

		switch(fetchContactsStatus) {
			case requestStatus.NONE:
			case requestStatus.PENDING:
				return (
					<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
						<PacmanIndicator color='black' />
					</View>
				);
			case requestStatus.FULFILLED:
				if (contacts.length === 0)
					return (
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
							<Title style={{ color: '#9e9e9e' }}>
								NO HAY CONTACTOS
							</Title>
						</View>
					);
				else 
					return (
						<SwipeableSectionList 
							data={contacts}
							sectionBy='name'
							onEditItem={this.handleEditItem}
							onRemoveItem={this.handleRemoveItem}
						/>
					);
		}
	}

	componentDidMount = () => {
		this.props.fetchContacts();
	}

	render = () => (
		<Screen style={{ backgroundColor: 'black' }}>
			<Screen style={{ marginTop: selectPlatform(StatusBar.currentHeight, 0) }}>
				<View style={{
					backgroundColor: '#000',
					height: 70
				}}>
					<NavigationBar
						centerComponent={<Title>CONTACTOS</Title>}
						styleName="clear"
					/>
				</View>
				<SearchBox />
				{this.renderListView()}
				<ActionButton
					onPress={this.handleNewContact}
					renderIcon={() => <Icon name="add-friend" style={{ color: 'white' }} />}
					buttonColor="#000"
					fixNativeFeedbackRadius={true}
					useNativeFeedback={false}
					offsetX={15}
					offsetY={15}
				/>
			</Screen>
		</Screen>
	);
}