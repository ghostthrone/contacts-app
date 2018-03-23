import { all } from 'redux-saga/effects';

import fetchContactsWatcher from './fetchContacts';
import onValueFirebaseWatcher from './firebaseChannel';
import addContactWatcher from './addContact';
import removeContactWatcher from './removeContact';
import updateContactWatcher from './updateContact';

export default function* rootSaga() {
	yield all([
		fetchContactsWatcher(),
		onValueFirebaseWatcher(),
		addContactWatcher(),
		removeContactWatcher(),
		updateContactWatcher()
	]);
} 