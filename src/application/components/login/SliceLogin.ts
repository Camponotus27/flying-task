import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState, AppThunk } from '../../../redux/store';
import LoginModel from '../../../domain/LoginModel';

export interface ILogingState {
	login?: LoginModel;
	signin: {
		isLoading: boolean;
		isError: boolean;
	};
	signout: {
		isLoading: boolean;
		isError: boolean;
	};
}

const initialState: ILogingState = {
	signin: {
		isLoading: false,
		isError: false,
	},
	signout: {
		isLoading: false,
		isError: false,
	},
};

export const logingSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<LoginModel>) => {
			state.login = action.payload;
		},
		signOut: (state, action: PayloadAction) => {
			state.login = undefined;
		},
	},
});

export const { signIn, signOut } = logingSlice.actions;

export default logingSlice.reducer;
