import WordItemList from './Word';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
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
}: IListWordProps) {
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
			<Typography variant="h2" style={{ margin: 20 }}>
				English Dictionary
			</Typography>
			<Grid container spacing={3}>
				{body}
			</Grid>
		</>
	);
}
