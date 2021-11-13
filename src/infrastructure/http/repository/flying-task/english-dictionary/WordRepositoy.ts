import axios from 'axios';
import { IResponse, IWordEntity, IResponseList } from './interfaces';
import {
	mapWordEntityListToWordModelList,
	mapWordEntityToWordModel,
	mapWordModelToIWordEntity,
} from './mappers';
import WordModel from '../../../../../domain/WordModel';

export async function fetchWords(search?: string): Promise<WordModel[]> {
	const res = await axios.get<IResponseList>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary`,
		{
			params: { search: search || '' },
		}
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});
	return mapWordEntityListToWordModelList(dataResposnse.data.data);
}

export async function createWord(modelWord: WordModel): Promise<WordModel> {
	const res = await axios.post<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary`,
		mapWordModelToIWordEntity(modelWord)
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});

	return mapWordEntityToWordModel(dataResposnse.data);
}

export async function updateWord(modelWord: WordModel): Promise<WordModel> {
	let word = mapWordModelToIWordEntity(modelWord);
	if (!word.id) {
		return new Promise((resolve, reject) => {
			reject('custom error: ' + 'para actualizar se necesita una id');
		});
	}

	const res = await axios.put<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary/${word.id}`,
		word
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error: ' + dataResposnse.error);
		});

	return mapWordEntityToWordModel(dataResposnse.data);
}

export async function deleteWord(idWord: number): Promise<void> {
	const res = await axios.delete<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary/${idWord}`
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});
}
