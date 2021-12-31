// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { User as LogingUser, Login } from './interfaces';

import {
	getAuth,
	getRedirectResult,
	GoogleAuthProvider,
	signInWithRedirect,
} from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
	measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();
export const signInWithGoogle = async () => {
	signInWithRedirect(auth, provider);
};

export const getRedirectResultAsync = async (): Promise<Login> => {
	return new Promise((resolve, reject) => {
		getRedirectResult(auth)
			.then((result) => {
				if (!result) {
					reject('No result');
					return;
				}

				// This gives you a Google Access Token. You can use it to access Google APIs.
				const credential = GoogleAuthProvider.credentialFromResult(result);

				if (!credential) {
					reject('No credential');
					return;
				}
				const token = credential.accessToken;

				// The signed-in user info.
				const user = result.user;
				if (!user) {
					reject('No user in result');
				}

				const userResponse: LogingUser = {
					name: user.displayName || 'TU',
					email: user.email || 'NoEmail',
					uid: user.uid,
					urlImage: user.photoURL || undefined,
				};
				const login: Login = { token, user: userResponse };
				resolve(login);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;

				reject('Error' + error.message);
				console.log('Error', errorCode, errorMessage);
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);

				console.log(errorMessage);
				// ...
			});
	});
};

export default firebase;
