import React from 'react';
import GoogleLogin from './GoogleLogin';
import { PropsFromRedux } from './SectionGoogleReduxLogin';

export default function SectionGoogleLogin({
	signIn,
	signOut,
}: PropsFromRedux) {
	return <GoogleLogin signIn={signIn}></GoogleLogin>;
}
