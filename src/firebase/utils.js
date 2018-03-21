/**
 * Convierte una snapshot de firebase en un array de javascript
 * @param {Object} snapshot 
 */
export const firebaseSnapshotToArray = snapshot => {
	const result = [];
	const snapshotItems = snapshot.toJSON();
	for(const key in snapshotItems)
		result.push(snapshotItems[key]);
	return result;
}