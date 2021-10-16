import { connect, ConnectedProps } from 'react-redux';
import { IRootState } from './../../../redux/store';
import { fetchTaskAsync, deleteTaskAsync, setTaskEdit } from './SliceTask';
import SectionTask from './SectionTask';

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
export type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(SectionTask);
