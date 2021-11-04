export interface IResponse {
	data: IWordEntity;
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
	data: IWordEntity[];
	links: any;
	pagination: any;
}

export interface IWordEntity {
	id?: number;
	word: string;
	pronunciation: string;
	significance: string;
	note: string;
	updated_at?: string;
}
