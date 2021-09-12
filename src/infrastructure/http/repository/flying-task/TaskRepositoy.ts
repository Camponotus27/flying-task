import axios from 'axios';
import { IResponse, ITaskEntity, IResponseList } from './interfaces';
import {
	mapTaskEntityListToTaskModelList,
	mapTaskEntityToTaskModel,
} from './mappers';
import TaskModel from '../../../../domain/TaskModel';
export async function fetchTasks(): Promise<TaskModel[]> {
	const res = await axios.get<IResponseList>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task`
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});
	return mapTaskEntityListToTaskModelList(dataResposnse.data.data);
}

export async function createTask(task: ITaskEntity): Promise<TaskModel> {
	const res = await axios.post<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task`,
		task
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});

	return mapTaskEntityToTaskModel(dataResposnse.data);
}

export async function updateTask(task: ITaskEntity): Promise<TaskModel> {
	if (!task.id) {
		return new Promise((resolve, reject) => {
			reject('custom error: ' + 'para actualizar se necesita una id');
		});
	}

	const res = await axios.put<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task/${task.id}`,
		task
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error: ' + dataResposnse.error);
		});

	return mapTaskEntityToTaskModel(dataResposnse.data);
}

export async function deleteTask(idTask: number): Promise<void> {
	const res = await axios.delete<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task/${idTask}`
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});
}
