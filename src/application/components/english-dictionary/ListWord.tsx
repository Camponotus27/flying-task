import { useState } from 'react';
import WordItemList from './Word';

import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {
	DefaultMessageErrorListWord,
	DefaultMessageLoadingListWord,
	DefaultMessageEmptyListWord,
} from './constans';
import { IListWordProps } from './interfaces';

export default function ListWord({
	words,
	isLoading = false,
	isError = false,
	deleteWordAsync,
	updateWordAsync,
	createWordAsync,
	fetchWordAsync,
}: IListWordProps) {
	const [search, setSearch] = useState('');

	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchWordAsync(search);
	};
	const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handlerCancelSearch = () => {
		setSearch('');
		fetchWordAsync();
	};

	let body: JSX.Element | JSX.Element[] = (
		<Grid item>
			<h1>{DefaultMessageEmptyListWord}</h1>
		</Grid>
	);
	if (isLoading) {
		body = (
			<Grid item>
				<h1>{DefaultMessageLoadingListWord}</h1>
			</Grid>
		);
	} else if (isError) {
		body = (
			<Grid item>
				<h1>{DefaultMessageErrorListWord}</h1>
			</Grid>
		);
	} else if (words.length > 0) {
		body = words.map((word) => {
			return (
				<Grid key={word.id} item xs={12} sm={6} md={4} lg={3}>
					<List>
						<WordItemList
							word={word}
							deleteWordAsync={deleteWordAsync}
							updateWordAsync={updateWordAsync}
							createWordAsync={createWordAsync}
						></WordItemList>
					</List>
				</Grid>
			);
		});
	}

	return (
		<>
			<Typography variant="h2" style={{ textAlign: 'center' }}>
				English Dictionary
			</Typography>
			<div style={{ padding: '0 15px' }}>
				<form onSubmit={handlerSubmit}>
					<TextField
						fullWidth
						id="search"
						name="search"
						label="Buscar..."
						value={search}
						onChange={handlerChangeSearch}
						InputProps={{
							endAdornment: search && (
								<InputAdornment position="end">
									<IconButton
										edge="end"
										color="error"
										onClick={handlerCancelSearch}
									>
										<ClearIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</form>
			</div>
			<Grid container spacing={3}>
				{body}
			</Grid>
		</>
	);
}
