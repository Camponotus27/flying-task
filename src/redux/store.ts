import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer, {
	ITaskState,
} from '../application/components/task/SliceTask';

import englishDictionaryReducer, {
	IWordState,
} from '../application/components/english-dictionary/SliceWord';

export interface IRootState {
	tasks: ITaskState;
	dictionaryReducer: IWordState;
}

function makeStore() {
	return configureStore({
		reducer: {
			tasks: tasksReducer,
			dictionaryReducer: englishDictionaryReducer,
		},
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
