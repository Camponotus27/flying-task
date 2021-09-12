import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer, {
	ITaskState,
} from '../application/components/task/SliceTask';

export interface IRootState {
	tasks: ITaskState;
}

function makeStore() {
	return configureStore({
		reducer: { tasks: tasksReducer },
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
