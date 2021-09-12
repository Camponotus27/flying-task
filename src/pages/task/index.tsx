import ListTask from '../../application/components/task/ListTask';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../../application/components/layouts/Layout';
import { IRootState } from './../../redux/store';
import {
	fetchTaskAsync,
	deleteTaskAsync,
} from '../../application/components/task/SliceTask';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

function PageTask({
	tasks,
	isLoading,
	isError,
	fetchTaskAsync,
	deletingState,
	deleteTaskAsync,
}: PropsFromRedux) {
	const router = useRouter();

	useEffect(() => {
		fetchTaskAsync();
	}, []);

	const handleCreateClick = () => {
		router.push('task/create');
	};

	const handleDeleteClick = () => {};

	return (
		<Layout>
			<Button variant="contained" color="primary" onClick={handleCreateClick}>
				Crear
			</Button>
			<ListTask
				tasks={tasks}
				isLoading={isLoading}
				isError={isError}
				deleteTaskAsync={deleteTaskAsync}
				deletingState={deletingState}
			/>
		</Layout>
	);
}

const mapStateToProps = (state: IRootState) => {
	const taskState = state.tasks;

	const { isLoading, isError } = taskState.feching;

	return {
		tasks: taskState.tasks,
		isLoading,
		isError,
		deletingState: taskState.deleting,
	};
};

const mapDispatchToProps = {
	fetchTaskAsync,
	deleteTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(PageTask);
