import * as firebase from 'firebase';

export default function configureFirebase() {
	const config = {
		apiKey: "AIzaSyDcQxFYWMM3ZTAnGMRraGeGJQOajO2nLAc",
		authDomain: "directorio-telefono.firebaseapp.com",
		databaseURL: "https://directorio-telefono.firebaseio.com",
		projectId: "directorio-telefono",
		storageBucket: "directorio-telefono.appspot.com",
		messagingSenderId: "623371149492"
	};
	 
	return firebase.initializeApp(config);
}