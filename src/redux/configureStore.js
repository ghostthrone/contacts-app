import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import contacts from './modules/contacts';
import configureFirebase from '../firebase/configureFirebase';
import { addContact } from '../firebase/operations';

export default function configureStore() {
	const firebase = configureFirebase();
	const sagaMiddleware = createSagaMiddleware({
		context: {
			firebase
		}
	});
	const store = createStore(contacts, applyMiddleware(sagaMiddleware))

	return {
		store,
		sagaMiddleware
	};
}