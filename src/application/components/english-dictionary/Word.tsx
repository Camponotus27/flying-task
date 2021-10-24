import styles from './styles.module.css';
import WordModel, { defaultAsyncState } from '../../../domain/WordModel';
import { useState, MouseEvent } from 'react';
import clsx from 'clsx';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

// material UI
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useRouter } from 'next/router';

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
							<>
								{ifEditing ? (
									<TextField
										variant="outlined"
										size="small"
										name="word"
										value={formik.values.word}
										onChange={formik.handleChange}
										error={formik.touched.word && Boolean(formik.errors.word)}
										helperText={formik.touched.word && formik.errors.word}
									/>
								) : (
									<div>
										<Typography variant="h5" component="h5">
											{word.word}
										</Typography>
									</div>
								)}
								<div style={{ marginTop: 20 }}>
									{ifEditing ? (
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
												formik.touched.pronunciation && formik.errors.word
											}
										/>
									) : (
										<div>
											<Typography>{word.pronunciation}</Typography>
										</div>
									)}
								</div>
							</>
						}
					/>
				</ListItem>
				<ListItem></ListItem>
			</form>
		</FormikProvider>
	);
}
