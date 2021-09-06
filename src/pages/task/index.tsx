import ListTask from '../../components/task/ListTask';
import { useEffect, useState } from 'react';
import { IListTaskProps, ITask } from './../../components/task/interfaces';
import axios from 'axios';
import Layout from '../../components/layouts/Layout';

const InitialState: ITask[] = [];

export default function PageTask() {
	const [tasks, setTasks] = useState(InitialState);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task`)
			.then((res) => res.data.data)
			.then((data) => {
				setTasks(data.data);
				setIsLoading(false);
				setIsError(false);
			})
			.catch((err) => setIsError(true));
	}, []);
	return (
		<Layout>
			<ListTask tasks={tasks} isLoading={isLoading} isError={isError} />
		</Layout>
	);
}
