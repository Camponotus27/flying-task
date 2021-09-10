import ListTask from '../../components/task/ListTask';
import { useEffect } from 'react';
import { ITask } from './../../components/task/interfaces';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { IRootState } from './../../redux/store';
import { fetchTaskAsync } from './../../components/task/SliceTask';

function PageTask({
	tasks,
	isLoading,
	isError,
	fetchTaskAsync,
}: PropsFromRedux) {
	useEffect(() => {
		fetchTaskAsync();
	}, []);

	return (
		<Layout>
			<ListTask tasks={tasks} isLoading={isLoading} isError={isError} />
		</Layout>
	);
}

const mapStateToProps = (state: IRootState) => {
	const taskState = state.tasks;
	return {
		tasks: taskState.tasks,
		isLoading: taskState.isLoading,
		isError: taskState.isError,
	};
};

const mapDispatchToProps = {
	fetchTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(PageTask);
