import { eventChannel } from 'redux-saga';
import { getContext, call, take, put } from 'redux-saga/effects';

import {
	updateCurrentContactsPending,
	updateCurrentContacts
} from '../modules/contacts';
import { firebaseSnapshotToArray } from '../../firebase/utils';

let already = false;

const createFirebaseChannel = contactsRef => eventChannel(emit => {
	const onValueHandler = snapshot => emit(firebaseSnapshotToArray(snapshot));
	contactsRef.on('value', onValueHandler);
	return () => contactsRef.off('value', onValueHandler);
});

export default function* onValueFirebaseWatcher() {
	const firebase = yield getContext('firebase');
	const database = firebase.database();
	const firebaseChannel = yield call(createFirebaseChannel, database.ref('/contacts'))

	while (true) {
		const contacts = yield take(firebaseChannel);
		if(already) {
			yield put(updateCurrentContactsPending());
			yield put(updateCurrentContacts(contacts));
		} else 
			already = true;
	}
}