import { takeEvery, call, put, getContext } from 'redux-saga/effects';

import {fetchContacts} from '../../firebase/operations';

import { 
	FETCH_CONTACTS, 
	fetchContactsFulfilled,
	fetchContactsFailed,
	fetchContactsPending
} from '../modules/contacts';

function* fetchContactsWorker() {
	try {
		yield put(fetchContactsPending());
		const firebase = yield getContext('firebase');
		const database = firebase.database();
		const contacts = yield call(fetchContacts, database.ref('/contacts'));
		yield put(fetchContactsFulfilled(contacts));
	} catch (ex) {
		yield put(fetchContactsFailed());
	}
}

export default function* fetchContactsWatcher() {
	yield takeEvery(FETCH_CONTACTS, fetchContactsWorker);
}

