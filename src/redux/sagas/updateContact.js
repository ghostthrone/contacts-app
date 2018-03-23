import { getContext, fork, takeEvery, put } from 'redux-saga/effects';

import { UPDATE_CONTACT, resetCurrentContact, addContactSuccess as updateContactSuccess } from '../modules/contacts';
import { updateContactById } from '../../firebase/operations';

function* updateContactWorker(action) {
	try {
		const firebase = yield getContext('firebase');
		const database = firebase.database();
		const result = yield fork(updateContactById, database.ref().child('/contacts'), action.payload);
		if (result) {
			yield put(resetCurrentContact());
			yield put(updateContactSuccess());
		}
	} catch(ex) {
	}
}

export default function* updateContactWatcher() {
	yield takeEvery(UPDATE_CONTACT, updateContactWorker);
}