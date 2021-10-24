import WordModel from '../../../domain/WordModel';
import { deletingState } from './SliceWord';

export interface IListWordProps {
	words: WordModel[];
	isLoading?: boolean;
	isError?: boolean;
	deleteWordAsync(idWord: number): void;
	createWordAsync(word: WordModel): void;
	updateWordAsync(word: WordModel): void;
}
