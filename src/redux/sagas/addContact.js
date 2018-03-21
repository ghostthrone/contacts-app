import { call, put, takeEvery, getContext } from 'redux-saga/effects';

import { ADD_CONTACT, addContactPending, addContactSuccess, addContactFailed } from '../modules/contacts';
import { addContact } from '../../firebase/operations';

function* addContactWorker(action) {
	try {
		yield put(addContactPending());
		const firebase = yield getContext('firebase');
		const database = firebase.database();
		const result = yield call(addContact, database.ref().child('/contacts'), action.payload);
		if(result)
			yield put(addContactSuccess())
		else
			yield put(addContactFailed())
	} catch(ex) {
		yield put(addContactFailed())
	}
}

export default function* addContactWatcher() {
	yield takeEvery(ADD_CONTACT, addContactWorker);
}