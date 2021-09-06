import Task from './Task';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
	DefaultMessageErrorListTask,
	DefaultMessageLoadingListTask,
} from './constans';
import { IListTaskProps } from './interfaces';

export default function ListTask({
	tasks,
	isLoading = false,
	isError = false,
}: IListTaskProps) {
	let body;
	if (isLoading) {
		body = (
			<Grid item xs={3}>
				<h1>{DefaultMessageLoadingListTask}</h1>
			</Grid>
		);
	} else if (isError) {
		body = (
			<Grid item xs={3}>
				<h1>{DefaultMessageErrorListTask}</h1>
			</Grid>
		);
	} else {
		body = tasks.map((task) => {
			return (
				<Grid key={task.id} item xs={3}>
					<Task task={task}></Task>
				</Grid>
			);
		});
	}

	return (
		<>
			<Typography variant="h2">Lista de Tareas</Typography>
			<Grid container spacing={3}>
				{body}
			</Grid>
		</>
	);
}
