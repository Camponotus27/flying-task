import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer, {
	ITaskState,
} from './../application/components/task/SliceTask';
import loginReducer, {
	ILogingState,
} from './../application/components/login/SliceLogin';

export interface IRootState {
	tasks: ITaskState;
	login: ILogingState;
}

function makeStore() {
	return configureStore({
		reducer: { tasks: tasksReducer, login: loginReducer },
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
