import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import LoginModel from './../../../domain/LoginModel';

interface Props {
	signIn: (login: LoginModel) => void;
}

export default function GoogleLogin({ signIn }: Props) {
	const preLoginTracking = (): void => {
		console.log('preLoginTracking');
		console.log('Attemp to login with google');
	};

	const errorHandler = (error: string): void => {
		console.log('errorHandler');
		// handle error if login got failed...
		console.error(error);
	};

	const responseGoogle = (googleUser: gapi.auth2.GoogleUser): void => {
		console.log('responseGoogle');
		const basicProfile = googleUser.getBasicProfile();

		const id_token = googleUser.getAuthResponse(true).id_token;
		const googleId = googleUser.getId();
		console.log('isSignedIn', googleUser.isSignedIn());

		signIn({
			id: googleId,
			name: basicProfile.getName(),
			urlImage: basicProfile.getImageUrl(),
			accessToken: id_token,
		});
	};

	const clientConfig = {
		client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
	};

	return (
		<GoogleLoginButton
			responseHandler={responseGoogle}
			clientConfig={clientConfig}
			preLogin={preLoginTracking}
			failureHandler={errorHandler}
		/>
	);
}
