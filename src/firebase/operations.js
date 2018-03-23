import { firebaseSnapshotToArray } from './utils';

/**
 * Agrega un contacto a la base de datos de firebase
 * @param {Object} contactsRef 
 * @param {Object} contact 
 */
export const addContact = async (contactsRef, contact) => {
	try {
		const id = contactsRef.push().key;
		await contactsRef.child(id).set({ ...contact, id });
		return true;
	} catch (ex) {
		return false;
	}
}

/**
 * Elimina un contacto por id de la base de datos de firebase
 * @param {Object} contactsRef 
 * @param {string} id 
 */
export const removeContactById = async (contactsRef, id) => {
	try {
		await contactsRef.child(id).remove();
		return true;
	} catch (ex) {
		return false;
	}
}

/**
 * Actualiza un contacto por id de la base de datos de firebase
 * @param {Object} contactsRef
 * @param {Object} updatedContact 
 */
export const updateContactById = async (contactsRef, updatedContact) => {
	try {
		const { id } = updatedContact;
		await contactsRef.child(id).update(updatedContact);
		return true;
	} catch (ex) {
		return false;
	}
}

/**
 * Consulta todos los contactos de la base de datos de firebase
 * @param {Object} contactsRef 
 */
export const fetchContacts = async contactsRef => {
	try {
		const contactsSnapshot = await contactsRef.once('value');
		const contacts = firebaseSnapshotToArray(contactsSnapshot);
		console.log(contacts);
		return contacts;
	} catch (ex) {
		return null;
	}
}

/**
 * Consulta un contacto por id de la base de datos de firebase
 * @param {Object} contactsRef 
 * @param {string} id 
 */
export const fetchContactById = async (contactsRef, id) => {
	try {
		const contact = await contactsRef.child(id).once('value');
		return contact.val();
	} catch (ex) {
		return null;
	}
}
