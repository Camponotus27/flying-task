import { connect, ConnectedProps } from 'react-redux';
import { IRootState } from './../redux/store';

import Layout from '../application/components/layouts/Layout';
import SectionReduxTask from './../application/components/task/SectionReduxTask';
import SectionGoogleReduxLogin from './../application/components/login/SectionGoogleReduxLogin';

function Home({ login }: PropsFromRedux) {
	return (
		<Layout>
			{!login && <SectionGoogleReduxLogin />}

			<SectionReduxTask />
		</Layout>
	);
}

const mapStateToProps = (state: IRootState) => {
	const logingState = state.login;

	const { login } = logingState;

	return {
		login,
	};
};

const mapDispatchToProps = {};

const conn = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(Home);
