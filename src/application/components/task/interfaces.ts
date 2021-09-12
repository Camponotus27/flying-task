import TaskModel from '../../../domain/TaskModel';
import { deletingState } from './SliceTask';

export interface IListTaskProps {
	tasks: TaskModel[];
	isLoading?: boolean;
	isError?: boolean;
	deleteTaskAsync(idTask: number): void;
	deletingState: deletingState;
	setTaskEdit(task: TaskModel): void;
}
