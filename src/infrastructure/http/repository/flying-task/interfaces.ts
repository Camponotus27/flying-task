export interface IResponse {
	data: ITaskEntity;
	error: any;
	message: string;
	code: number;
}

export interface IResponseList {
	data: IResponseDataList;
	error: any;
	message: string;
	code: number;
}

interface IResponseDataList {
	data: ITaskEntity[];
	links: any;
	pagination: any;
}

export interface ITaskEntity {
	id?: number;
	title: string;
	body: string;
}
