import ListWord from '../../application/components/english-dictionary/ListWord';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../../application/components/layouts/Layout';
import { defaultAsyncState } from '../../domain/WordModel';
import { useRouter } from 'next/router';
import { IRootState } from '../../redux/store';
import {
	fetchWordAsync,
	createWordAsync,
	deleteWordAsync,
	updateWordAsync,
} from '../../application/components/english-dictionary/SliceWord';

// Mui
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

function PageWord({
	words,
	creatingState,
	fechingState,
	fetchWordAsync,
	deleteWordAsync,
	updateWordAsync,
	createWordAsync,
}: PropsFromRedux) {
	const router = useRouter();
	useEffect(() => {
		fetchWordAsync();
	}, []);

	const handleCreateClick = () => {
		createWordAsync({
			word: 'new word',
			pronunciation: '',
			significance: '',
			note: '',
			asyncStateUpdate: defaultAsyncState,
			asyncStateDelete: defaultAsyncState,
		});
	};

	return (
		<Layout>
			<Fab
				disabled={creatingState.isLoading}
				onClick={handleCreateClick}
				sx={{
					position: 'fixed',
					bottom: 66,
					right: 16,
					zIndex: 10,
				}}
				color="primary"
				aria-label="add"
			>
				{creatingState.isLoading ? <CircularProgress /> : <AddIcon />}
			</Fab>
			<ListWord
				words={words}
				isLoading={fechingState.isLoading}
				isError={fechingState.isError}
				fetchWordAsync={fetchWordAsync}
				deleteWordAsync={deleteWordAsync}
				updateWordAsync={updateWordAsync}
				createWordAsync={createWordAsync}
			/>
		</Layout>
	);
}

const mapStateToProps = (state: IRootState) => {
	const wordState = state.dictionaryReducer;
	return {
		words: wordState.words,
		fechingState: wordState.feching,
		creatingState: wordState.creating,
	};
};

const mapDispatchToProps = {
	fetchWordAsync,
	createWordAsync,
	updateWordAsync,
	deleteWordAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(PageWord);
