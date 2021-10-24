import axios from 'axios';
import { IResponse, IWordEntity, IResponseList } from './interfaces';
import {
	mapWordEntityListToWordModelList,
	mapWordEntityToWordModel,
} from './mappers';
import WordModel from '../../../../../domain/WordModel';

export async function fetchWords(): Promise<WordModel[]> {
	const res = await axios.get<IResponseList>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary`
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});
	return mapWordEntityListToWordModelList(dataResposnse.data.data);
}

export async function createWord(word: IWordEntity): Promise<WordModel> {
	const res = await axios.post<IResponse>(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/english-dictionary`,
		word
	);

	const dataResposnse = res.data;

	if (dataResposnse.error)
		return new Promise((resolve, reject) => {
			reject('custom error:' + dataResposnse.error);
		});

	return mapWordEntityToWordModel(dataResposnse.data);
}

export async function updateWord(word: IWordEntity): Promise<WordModel> {
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
