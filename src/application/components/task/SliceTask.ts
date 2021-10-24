import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../../../redux/store';
import {
	fetchTasks,
	createTask,
	updateTask,
	deleteTask,
} from '../../../infrastructure/http/repository/flying-task/task/TaskRepositoy';
import TaskModel from '../../../domain/TaskModel';

export interface deletingState {
	idTask: number;
	isLoading: boolean;
	isError: boolean;
}

export interface editState {
	task?: TaskModel;
	isLoading: boolean;
	isError: boolean;
}

export interface ITaskState {
	tasks: TaskModel[];
	feching: {
		isLoading: boolean;
		isError: boolean;
	};
	creating: editState;
	deleting: deletingState;
}

const initialState: ITaskState = {
	tasks: [],
	feching: {
		isLoading: false,
		isError: false,
	},
	creating: {
		isLoading: false,
		isError: false,
	},
	deleting: {
		idTask: 0,
		isLoading: false,
		isError: false,
	},
};

export const fetchTaskAsync = createAsyncThunk(
	'tasks/fetchTasks',
	async (): Promise<TaskModel[]> => await fetchTasks()
);

export const createTaskAsync = createAsyncThunk(
	'tasks/createTask',
	async (task: TaskModel): Promise<TaskModel> => await createTask(task)
);

export const updateTaskAsync = createAsyncThunk(
	'tasks/updateTask',
	async (task: TaskModel): Promise<TaskModel> => await updateTask(task)
);

export const deleteTaskAsync = createAsyncThunk(
	'tasks/deleteTask',
	async (idTask: number): Promise<number> => {
		await deleteTask(idTask);

		return new Promise((resolve, reject) => {
			resolve(idTask);
		});
	}
);

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setTaskEdit: (state, action: PayloadAction<TaskModel | undefined>) => {
			state.creating.task = action.payload;
		},
	},

	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.

	extraReducers: (builder) => {
		builder
			.addCase(fetchTaskAsync.pending, (state) => {
				state.feching = {
					isError: false,
					isLoading: true,
				};
			})
			.addCase(fetchTaskAsync.fulfilled, (state, action) => {
				state.feching = {
					isError: false,
					isLoading: false,
				};
				state.tasks = action.payload;
			})
			.addCase(fetchTaskAsync.rejected, (state, action) => {
				state.feching = {
					isError: true,
					isLoading: false,
				};
				state.tasks = [];
			})

			.addCase(createTaskAsync.pending, (state) => {
				state.creating = {
					isError: false,
					isLoading: true,
				};
			})
			.addCase(createTaskAsync.fulfilled, (state, action) => {
				state.creating = {
					task: action.payload,
					isError: false,
					isLoading: false,
				};
				state.tasks = [...state.tasks, action.payload];
			})
			.addCase(createTaskAsync.rejected, (state, action) => {
				state.creating = {
					isError: true,
					isLoading: false,
				};
				state.tasks = [];
			})
			.addCase(deleteTaskAsync.pending, (state, action) => {
				state.deleting = {
					idTask: state.deleting.idTask,
					isError: false,
					isLoading: true,
				};
			})
			.addCase(deleteTaskAsync.fulfilled, (state, action) => {
				const idDeletedTask = action.payload;
				state.deleting = {
					idTask: 0,
					isError: false,
					isLoading: false,
				};
				state.tasks = state.tasks.filter((task) => task.id !== idDeletedTask);
			})
			.addCase(deleteTaskAsync.rejected, (state, action) => {
				state.deleting = {
					idTask: 0,
					isError: true,
					isLoading: false,
				};
			})
			.addCase(updateTaskAsync.pending, (state, action) => {
				state.creating = {
					task: state.creating.task,
					isError: false,
					isLoading: true,
				};
			})
			.addCase(updateTaskAsync.fulfilled, (state, action) => {
				const idDeletedTask = action.payload;
				state.creating = {
					task: state.creating.task,
					isError: false,
					isLoading: false,
				};
				state.tasks = state.tasks.map((task) => {
					if (task.id === action.payload.id) {
						return action.payload;
					} else {
						return task;
					}
				});
			})
			.addCase(updateTaskAsync.rejected, (state, action) => {
				state.creating = {
					task: undefined,
					isError: true,
					isLoading: false,
				};
			});
	},
});

export const { setTaskEdit } = taskSlice.actions;

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
