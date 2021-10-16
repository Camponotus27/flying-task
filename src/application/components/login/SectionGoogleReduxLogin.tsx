import { connect, ConnectedProps } from 'react-redux';
import { IRootState } from './../../../redux/store';
import { signIn, signOut } from './SliceLogin';
import SectionGoogleLogin from './SectionGoogleLogin';

const mapStateToProps = (state: IRootState) => {
	const logingState = state.login;

	const { login } = logingState;

	return {
		login,
	};
};

const mapDispatchToProps = {
	signIn,
	signOut,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(SectionGoogleLogin);
