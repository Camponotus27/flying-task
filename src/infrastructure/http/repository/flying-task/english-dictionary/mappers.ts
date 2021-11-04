import WordModel, { asyncState } from '../../../../../domain/WordModel';
import { IWordEntity } from './interfaces';

export function mapWordModelToIWordEntity(word_model: WordModel): IWordEntity {
	const { id, word, pronunciation, significance, note, updatedAt } = word_model;
	return {
		id,
		word,
		pronunciation,
		significance,
		note,
		updated_at: new Date(updatedAt).toString(),
	};
}

export function mapWordEntityToWordModel(word_entity: IWordEntity): WordModel {
	const { id, word, pronunciation, significance, note, updated_at } =
		word_entity;

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
		updatedAt: new Date(updated_at).getTime(),
		asyncStateUpdate: defaultAsyncState,
		asyncStateDelete: defaultAsyncState,
	};
}

export function mapWordEntityListToWordModelList(
	words: IWordEntity[]
): WordModel[] {
	return words.map((word) => mapWordEntityToWordModel(word));
}
