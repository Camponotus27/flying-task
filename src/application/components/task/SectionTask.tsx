import React from 'react';
import Button from '@material-ui/core/Button';
import ListTask from './ListTask';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PropsFromRedux } from './SectionReduxTask';

export default function SectionTask({
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

	const handleCreateClick = () => {
		setTaskEdit(undefined);
		router.push('task/create');
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleCreateClick}
				style={{ margin: 20 }}
			>
				Crear
			</Button>
			<ListTask
				tasks={tasks}
				isLoading={isLoading}
				isError={isError}
				deleteTaskAsync={deleteTaskAsync}
				deletingState={deletingState}
				setTaskEdit={setTaskEdit}
			/>
		</>
	);
}
