import ListTask from '../../application/components/task/ListTask';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../../application/components/layouts/Layout';
import { IRootState } from './../../redux/store';
import {
	fetchTaskAsync,
	deleteTaskAsync,
	setTaskEdit,
} from '../../application/components/task/SliceTask';

import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

function PageTask({
	tasks,
	isLoading,
	isError,
	fetchTaskAsync,
	deletingState,
	deleteTaskAsync,
	setTaskEdit,
}: PropsFromRedux) {
	const router = useRouter();

	useEffect(() => {
		fetchTaskAsync();
	}, []);

	return (
		<Layout>
			<ListTask
				tasks={tasks}
				isLoading={isLoading}
				isError={isError}
				deleteTaskAsync={deleteTaskAsync}
				deletingState={deletingState}
				setTaskEdit={setTaskEdit}
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
	setTaskEdit,
	fetchTaskAsync,
	deleteTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(PageTask);
