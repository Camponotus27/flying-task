export interface asyncState {
	isLoading: boolean;
	isError: boolean;
}

export default interface TaskModel {
	id?: number;
	word: string;
	pronunciation: string;
	significance: string;
	note: string;
	asyncStateUpdate: asyncState;
	asyncStateDelete: asyncState;
}

export const defaultAsyncState: asyncState = {
	isLoading: false,
	isError: false,
};
