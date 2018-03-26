import * as firebase from 'firebase';

export default function configureFirebase() {
	const config = {
		...config
	};

	return firebase.initializeApp(config);
}