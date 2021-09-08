import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../../redux/store';
import { fetchTasks } from './../../infrastructure/http/repository/flying-task/TaskRepositoy';
import { ITask } from '.';

export interface ITaskState {
	tasks: ITask[];
	isLoading: boolean;
	isError: boolean;
}

const initialState: ITaskState = {
	tasks: [],
	isLoading: false,
	isError: false,
};

export const fetchTaskAsync = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await fetchTasks();
	return response.data;
});

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {},

	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.

	extraReducers: (builder) => {
		builder
			.addCase(fetchTaskAsync.pending, (state) => {
				console.log('pending');
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchTaskAsync.fulfilled, (state, action) => {
				console.log('fulfilled', fetchTaskAsync.rejected);
				state.isLoading = false;
				state.isError = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTaskAsync.rejected, (state, action) => {
				console.log('fetchTaskAsync.rejected', action);
				state.isLoading = false;
				state.isError = true;
				state.tasks = [];
				console.log('fulfilled');
			});
	},
});

export const {} = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: AppState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd =
	(amount: number): AppThunk =>
	(dispatch, getState) => {
		const currentValue = selectCount(getState());
		if (currentValue % 2 === 1) {
			dispatch(incrementByAmount(amount));
		}
	}*/

export default taskSlice.reducer;