import { getContext, fork, takeEvery } from 'redux-saga/effects';

import { REMOVE_CONTACT } from '../modules/contacts';
import { removeContactById } from '../../firebase/operations';

function* removeContactWorker(action) {
	try {
		const firebase = yield getContext('firebase');
		const database = firebase.database();
		const result = yield fork(removeContactById, database.ref().child('/contacts'), action.id);
	} catch (ex) {
	}
}

export default function* removeContactWatcher() {
	yield takeEvery(REMOVE_CONTACT, removeContactWorker);
}