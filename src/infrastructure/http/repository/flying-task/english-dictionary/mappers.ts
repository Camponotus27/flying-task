import WordModel, { asyncState } from '../../../../../domain/WordModel';
import { IWordEntity } from './interfaces';

export function mapWordModelToIWordEntity(word_model: WordModel): IWordEntity {
	const { id, word, pronunciation, significance, note } = word_model;
	return { id, word, pronunciation, significance, note };
}

export function mapWordEntityToWordModel(word_entity: IWordEntity): WordModel {
	const { id, word, pronunciation, significance, note } = word_entity;

	const defaultAsyncState: asyncState = {
		isLoading: false,
		isError: false,
	};

	return {
		id,
		word,
		pronunciation,
		significance,
		note,
		asyncStateUpdate: defaultAsyncState,
		asyncStateDelete: defaultAsyncState,
	};
}

export function mapWordEntityListToWordModelList(
	words: IWordEntity[]
): WordModel[] {
	return words.map((word) => mapWordEntityToWordModel(word));
}
