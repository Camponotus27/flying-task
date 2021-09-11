import axios from 'axios';
import { ITask } from './../../../../components/task/interfaces'; // ojo con esta que deveria tener entidades pero las entidades tienen los casos de usos finales? no hay tiempo

export async function fetchTasks(): Promise<{ data: ITask[] }> {
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task`
	);
	return res.data.data;
}

export async function createTask(task: ITask): Promise<{ data: ITask }> {
	const res = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/task`,
		task
	);
	return res.data.data;
}
