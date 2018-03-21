import { first, requestStatus } from '../../utils/common';

const REDUCER_BASE = 'contacts';

// Defincion de acciones para el modulo contacts
export const ADD_CONTACT = `${REDUCER_BASE}/ADD_CONTACT`;
export const REMOVE_CONTACT = `${REDUCER_BASE}/REMOVE_CONTACT`;
export const UPDATE_CONTACT = `${REDUCER_BASE}/UPDATE_CONTACT`;
export const GET_CONTACT_BY_ID = `${REDUCER_BASE}/GET_CONTACT_BY_ID`;
export const FETCH_CONTACTS = `${REDUCER_BASE}/FETCH_CONTACTS`;

const ADD_CONTACT_PENDING = `${REDUCER_BASE}/ADD_CONTACT_PENDING`;
const ADD_CONTACT_SUCCESS = `${REDUCER_BASE}/ADD_CONTACT_SUCCESS`;
const ADD_CONTACT_FAILED = `${REDUCER_BASE}/ADD_CONTACT_FAILED`;
const UPDATE_CURRENT_CONTACTS = `${REDUCER_BASE}/UPDATE_CURRENT_CONTACTS`;
const UPDATE_CURRENT_CONTACTS_PENDING = `${REDUCER_BASE}/UPDATE_CURRENT_CONTACTS_PENDING`;
const FETCH_CONTACTS_PENDING = `${REDUCER_BASE}/FETCH_CONTACTS_PENDING`;
const FETCH_CONTACTS_FULFILLED = `${REDUCER_BASE}/FETCH_CONTACTS_FULFILLED`;
const FETCH_CONTACTS_FAILED = `${REDUCER_BASE}/FETCH_CONTACTS_FAILED`;
const RESET_CURRENT_CONTACT = `${REDUCER_BASE}/RESET_CURRENT_CONTACT`;
const SET_CURRENT_CONTACT = `${REDUCER_BASE}/SET_CURRENT_CONTACT`;

const initialState = {
	contacts: [],
	fetchContactsStatus: requestStatus.NONE,
	currentContact: null,
	addContactStatus: requestStatus.NONE
};

/**
 * Funcion reductora
 * @param {Object} state 
 * @param {{ type: string, payload: any }} action 
 */
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_CONTACT_BY_ID:
			return {
				...state,
				currentContact: first(state.contacts.filter(contact => contact.id === action.payload.id))
			};
		case UPDATE_CURRENT_CONTACTS_PENDING:
		case FETCH_CONTACTS_PENDING:
			return {
				...state,
				fetchContactsStatus: requestStatus.PENDING
			};
		case UPDATE_CURRENT_CONTACTS:
		case FETCH_CONTACTS_FULFILLED:
			return {
				...state,
				contacts: action.payload,
				fetchContactsStatus: requestStatus.FULFILLED
			};
		case ADD_CONTACT_PENDING:
			return {
				...state,
				addContactStatus: requestStatus.PENDING
			};
		case ADD_CONTACT_SUCCESS:
			return {
				...state,
				addContactStatus: requestStatus.SUCCESS
			};
		case ADD_CONTACT_FAILED:
			return {
				...state,
				addContactStatus: requestStatus.FAILED
			};
		case RESET_CURRENT_CONTACT:
			return {
				...state,
				currentContact: null
			};
		case SET_CURRENT_CONTACT:
			return {
				...state,
				currentContact: action.payload
			};
		default:
			return state;
	}
}

// Creadores De Acciones
export const fetchContacts = () => ({ type: FETCH_CONTACTS });
export const fetchContactsFulfilled = contacts => ({ type: FETCH_CONTACTS_FULFILLED, payload: contacts });
export const fetchContactsPending = () => ({ type: FETCH_CONTACTS_PENDING });
export const fetchContactsFailed = () => ({ type: FETCH_CONTACTS_FAILED });
export const updateCurrentContacts = contacts => ({ type: UPDATE_CURRENT_CONTACTS, payload: contacts });
export const updateCurrentContactsPending = contacts => ({ type: UPDATE_CURRENT_CONTACTS_PENDING });
export const addContactPending = () => ({ type: ADD_CONTACT_PENDING });
export const addContactSuccess = () => ({ type: ADD_CONTACT_SUCCESS });
export const addContactFailed = () => ({ type: ADD_CONTACT_FAILED });
export const resetCurrentContact = () => ({ type: RESET_CURRENT_CONTACT });
export const addContact = contact => ({ type: ADD_CONTACT, payload: contact });
export const removeContact = id => ({ type: REMOVE_CONTACT, id });
export const setCurrentContact = contact => ({ type: SET_CURRENT_CONTACT, payload: contact });