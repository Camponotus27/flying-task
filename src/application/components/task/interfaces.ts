import TaskModel from '../../../domain/TaskModel';
import { deletingState } from './SliceTask';

export interface IListTaskProps {
	tasks: TaskModel[];
	isLoading?: boolean;
	isError?: boolean;
	deleteTaskAsync(idTask: number): any;
	deletingState: deletingState;
}
