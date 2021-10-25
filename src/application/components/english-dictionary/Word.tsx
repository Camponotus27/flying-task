import styles from './styles.module.css';
import WordModel, { defaultAsyncState } from '../../../domain/WordModel';
import { useState, MouseEvent } from 'react';
import clsx from 'clsx';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

// material UI
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
	word: WordModel;
	deleteWordAsync(idWord: number): void;
	createWordAsync(word: WordModel): void;
	updateWordAsync(word: WordModel): void;
}

const validationSchema = yup.object({
	word: yup.string(),
	pronunciation: yup.string(),
	significance: yup.string(),
	note: yup.string(),
});

export default function WordItemList({
	word,
	deleteWordAsync,
	updateWordAsync,
	createWordAsync,
}: Props) {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [ifEditing, setIfEditing] = useState(false);

	const initialValues = {
		word: word.word || '',
		pronunciation: word.pronunciation || '',
		significance: word.significance || '',
		note: word.note || '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			if (word) {
				updateWordAsync({
					id: word.id,
					word: values.word,
					pronunciation: values.pronunciation,
					significance: values.significance,
					note: values.note,
					asyncStateUpdate: defaultAsyncState,
					asyncStateDelete: defaultAsyncState,
				});
			} else {
				console.log('Error se intenta actualizar sin un word');
			}
			setIfEditing(false);
		},
	});

	const handlerClickDelete = () => {
		if (confirmDelete) {
			deleteWord();
		} else {
			setConfirmDelete(true);
		}
	};

	const deleteWord = () => {
		if (!word.id) {
			//TODO: Crear notificacion  y mandar este err
			console.log('La word no tiene id', word);
		} else {
			handleClose();
			deleteWordAsync(word.id);
		}
	};

	const handleClose = () => {
		setConfirmDelete(false);
	};

	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<ListItem
					secondaryAction={
						word.asyncStateUpdate.isLoading ||
						word.asyncStateDelete.isLoading ? (
							<CircularProgress />
						) : ifEditing ? (
							<>
								<IconButton
									edge="end"
									aria-label="cancel"
									onClick={() => setIfEditing(false)}
								>
									<CancelIcon />
								</IconButton>
								<IconButton
									edge="end"
									aria-label="check"
									onClick={() => formik.submitForm()}
								>
									<CheckIcon />
								</IconButton>
							</>
						) : (
							<>
								<IconButton
									edge="end"
									aria-label="edit"
									onClick={() => setIfEditing(true)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									onClick={handlerClickDelete}
									edge="end"
									aria-label="delete"
								>
									<DeleteIcon />
									{confirmDelete && '?'}
								</IconButton>
							</>
						)
					}
				>
					<ListItemText
						primary={
							ifEditing ? (
								<>
									{' '}
									<TextField
										variant="outlined"
										size="small"
										name="word"
										value={formik.values.word}
										onChange={formik.handleChange}
										error={formik.touched.word && Boolean(formik.errors.word)}
										helperText={formik.touched.word && formik.errors.word}
									/>
									<TextField
										variant="outlined"
										size="small"
										name="pronunciation"
										value={formik.values.pronunciation}
										onChange={formik.handleChange}
										error={
											formik.touched.pronunciation &&
											Boolean(formik.errors.pronunciation)
										}
										helperText={
											formik.touched.pronunciation &&
											formik.errors.pronunciation
										}
									/>
									<TextField
										variant="outlined"
										size="small"
										name="significance"
										value={formik.values.significance}
										onChange={formik.handleChange}
										error={
											formik.touched.significance &&
											Boolean(formik.errors.significance)
										}
										helperText={
											formik.touched.significance && formik.errors.significance
										}
									/>
									<TextField
										variant="outlined"
										size="small"
										name="note"
										value={formik.values.note}
										onChange={formik.handleChange}
										error={formik.touched.note && Boolean(formik.errors.note)}
										helperText={formik.touched.note && formik.errors.note}
									/>
								</>
							) : (
								<div>
									<Typography variant="h5" component="h5">
										{word.word}
									</Typography>
									<Typography>{word.pronunciation}</Typography>
									<Typography>{word.significance}</Typography>
									<Typography>{word.note}</Typography>
								</div>
							)
						}
					/>
				</ListItem>
				<ListItem></ListItem>
			</form>
		</FormikProvider>
	);
}
