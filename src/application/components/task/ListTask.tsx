import ItemTask from './ItemTask';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
	DefaultMessageErrorListTask,
	DefaultMessageLoadingListTask,
	DefaultMessageEmptyListTask,
} from './constans';
import { IListTaskProps } from './interfaces';

export default function ListTask({
	tasks,
	isLoading = false,
	isError = false,
	deleteTaskAsync,
	deletingState,
	setTaskEdit,
}: IListTaskProps) {
	let body: JSX.Element | JSX.Element[] = (
		<Grid item>
			<h1>{DefaultMessageEmptyListTask}</h1>
		</Grid>
	);
	if (isLoading) {
		body = (
			<Grid item>
				<h1>{DefaultMessageLoadingListTask}</h1>
			</Grid>
		);
	} else if (isError) {
		body = (
			<Grid item>
				<h1>{DefaultMessageErrorListTask}</h1>
			</Grid>
		);
	} else if (tasks.length > 0) {
		body = tasks.map((task) => {
			return (
				<Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
					<ItemTask
						task={task}
						deleteTaskAsync={deleteTaskAsync}
						isDeleting={deletingState.idTask == task.id}
						setTaskEdit={setTaskEdit}
					></ItemTask>
				</Grid>
			);
		});
	}

	return (
		<>
			<Typography variant="h2" style={{ margin: 20 }}>
				Lista de Tareas
			</Typography>
			<Grid container spacing={3}>
				{body}
			</Grid>
		</>
	);
}
