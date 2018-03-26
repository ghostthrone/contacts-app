import { Platform } from 'react-native';

/**
 * Funciona igual que un setTimeout pero con promesas
 * se recomienda usar con async/await
 * @param {number} milliSeconds 
 */
export const sleep = milliSeconds =>
	new Promise(resolve => setTimeout(resolve, milliSeconds));

/**
 * Genera un string con caracteres al azar
 */
export const idGenerator = () =>
	Math.random().toString(36).substr(2, 9);

/**
 * Retorna el primer elemento de un array
 * Si el array está vacio retorna null
 * @param {Array} array 
 */
export const first = array => {
	if (array.length == 0)
		return null;

	return array[0];
}

/**
 * Retorna el ultimo elemento de un array
 * Si el array está vacio retorna null
 * @param {Array} array 
 */
export const last = array => {
	const arrayLen = array.length;
	if (arrayLen == 0)
		return null;

	return array[arrayLen - 1];
}

/**
 * Retorna el valor de isAndroid si el SO es android
 * en caso contrario retorna el valor de isIOS.
 * Disponible unicamente para React Nativce
 * @param {any} isAndroid 
 * @param {any} isIOS 
 */
export const selectPlatform = (isAndroid, isIOS) => Platform.OS === 'android' ? isAndroid : isIOS;

/**
 * Representa un enumerador con los posibles 
 * estados de cualquier petición.
 */
export const requestStatus = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED',
	FULFILLED: 'FULFILLED',
	NONE: 'NONE'
}