import ListTask from '../../components/task/ListTask';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { IRootState } from './../../redux/store';
import { fetchTaskAsync } from './../../components/task/SliceTask';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

function PageTask({
	tasks,
	isLoading,
	isError,
	fetchTaskAsync,
}: PropsFromRedux) {
	const router = useRouter();

	useEffect(() => {
		fetchTaskAsync();
	}, []);

	const handleClick = () => {
		router.push('task/create');
	};

	return (
		<Layout>
			<Button variant="contained" color="primary" onClick={handleClick}>
				Crear
			</Button>
			<ListTask tasks={tasks} isLoading={isLoading} isError={isError} />
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
	};
};

const mapDispatchToProps = {
	fetchTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(PageTask);
