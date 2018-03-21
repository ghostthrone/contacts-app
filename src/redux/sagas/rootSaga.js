import { all } from 'redux-saga/effects';

import fetchContactsWatcher from './fetchContacts';
import onValueFirebaseWatcher from './firebaseChannel';
import addContactWatcher from './addContact';

export default function* rootSaga() {
	yield all([
		fetchContactsWatcher(),
		onValueFirebaseWatcher(),
		addContactWatcher()
	]);
} 