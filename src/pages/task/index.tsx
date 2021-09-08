import ListTask from '../../components/task/ListTask';
import { useEffect, useState } from 'react';
import { IListTaskProps, ITask } from './../../components/task/interfaces';
import { connect } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { IRootState } from './../../redux/store';
import { fetchTaskAsync } from './../../components/task/SliceTask';

interface pageTaskProps {
	tasks: ITask[];
	isLoading: boolean;
	isError: boolean;
	fetchTaskAsync(): null;
}

function PageTask({
	tasks,
	isLoading,
	isError,
	fetchTaskAsync,
}: pageTaskProps) {
	console.log(tasks);

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

	console.log(taskState);

	return {
		tasks: taskState.tasks,
		isLoading: taskState.isLoading,
		isError: taskState.isError,
	};
};

const mapDispatchToProps = {
	fetchTaskAsync,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(PageTask);
