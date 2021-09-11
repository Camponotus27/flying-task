export interface ITask {
	id?: number;
	title: string;
	body: string;
}

export interface IListTaskProps {
	tasks: ITask[];
	isLoading?: boolean;
	isError?: boolean;
}
