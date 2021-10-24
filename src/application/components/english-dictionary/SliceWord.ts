import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchWords,
	createWord,
	updateWord,
	deleteWord,
} from '../../../infrastructure/http/repository/flying-task/english-dictionary/WordRepositoy';
import WordModel from '../../../domain/WordModel';

export interface IWordState {
	words: WordModel[];
	feching: {
		isLoading: boolean;
		isError: boolean;
	};
	creating: {
		isLoading: boolean;
		isError: boolean;
	};
}

const initialState: IWordState = {
	words: [],
	feching: {
		isLoading: false,
		isError: false,
	},
	creating: {
		isLoading: false,
		isError: false,
	},
};

export const fetchWordAsync = createAsyncThunk(
	'words/fetchWords',
	async (): Promise<WordModel[]> => await fetchWords()
);

export const createWordAsync = createAsyncThunk(
	'words/createWord',
	async (word: WordModel): Promise<WordModel> => await createWord(word)
);

export const updateWordAsync = createAsyncThunk(
	'words/updateWord',
	async (word: WordModel): Promise<WordModel> => await updateWord(word)
);

export const deleteWordAsync = createAsyncThunk(
	'words/deleteWord',
	async (idWord: number): Promise<number> => {
		await deleteWord(idWord);

		return new Promise((resolve, reject) => {
			resolve(idWord);
		});
	}
);

export const wordSlice = createSlice({
	name: 'word',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWordAsync.pending, (state) => {
				state.feching = {
					isError: false,
					isLoading: true,
				};
			})
			.addCase(fetchWordAsync.fulfilled, (state, action) => {
				state.feching = {
					isError: false,
					isLoading: false,
				};
				state.words = action.payload;
			})
			.addCase(fetchWordAsync.rejected, (state, action) => {
				state.feching = {
					isError: true,
					isLoading: false,
				};
				state.words = [];
			})
			.addCase(createWordAsync.pending, (state) => {
				state.creating = {
					isError: false,
					isLoading: true,
				};
			})
			.addCase(createWordAsync.fulfilled, (state, action) => {
				state.creating = {
					isError: false,
					isLoading: false,
				};
				state.words = [...state.words, action.payload];
			})
			.addCase(createWordAsync.rejected, (state, action) => {
				state.creating = {
					isError: true,
					isLoading: false,
				};
			})
			.addCase(deleteWordAsync.pending, (state, action) => {
				state.words = state.words.map((word) => {
					if (word.id === action.meta.arg)
						return {
							...word,
							asyncStateDelete: {
								...word.asyncStateDelete,
								isLoading: true,
							},
						};
					return word;
				});
			})
			.addCase(deleteWordAsync.fulfilled, (state, action) => {
				const idDeletedWord = action.payload;
				state.words = state.words.filter((word) => word.id !== idDeletedWord);
			})
			.addCase(deleteWordAsync.rejected, (state, action) => {
				state.words = state.words.map((word) => {
					if (word.id === action.meta.arg)
						return {
							...word,
							asyncStateDelete: {
								...word.asyncStateDelete,
								isError: true,
							},
						};
					return word;
				});
			})
			.addCase(updateWordAsync.pending, (state, action) => {
				state.words = state.words.map((word) => {
					if (word.id === action.meta.arg.id)
						return {
							...word,
							asyncStateUpdate: {
								...word.asyncStateUpdate,
								isLoading: true,
							},
						};
					return word;
				});
			})
			.addCase(updateWordAsync.fulfilled, (state, action) => {
				state.words = state.words.map((word) => {
					if (word.id === action.payload.id) {
						return {
							...action.payload,
							asyncStateUpdate: {
								...word.asyncStateUpdate,
								isLoading: false,
							},
						};
					} else {
						return word;
					}
				});
			})
			.addCase(updateWordAsync.rejected, (state, action) => {
				state.words = state.words.map((word) => {
					if (word.id === action.meta.arg.id)
						return {
							...word,
							asyncStateUpdate: {
								...word.asyncStateUpdate,
								isError: true,
							},
						};
					return word;
				});
			});
	},
});

export default wordSlice.reducer;
