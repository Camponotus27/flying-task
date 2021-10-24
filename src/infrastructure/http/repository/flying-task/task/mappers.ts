import TaskModel from '../../../../../domain/TaskModel';
import { ITaskEntity } from './interfaces';

export function mapTaskModelToITaskEntity(task: TaskModel): ITaskEntity {
	const { id, title, body } = task;
	return { id, title, body };
}

export function mapTaskEntityToTaskModel(task: ITaskEntity): TaskModel {
	const { id, title, body } = task;
	return { id, title, body };
}

export function mapTaskEntityListToTaskModelList(
	tasks: ITaskEntity[]
): TaskModel[] {
	return tasks.map((task) => mapTaskEntityToTaskModel(task));
}
