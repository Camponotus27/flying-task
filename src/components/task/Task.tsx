import styles from './styles.module.css';
import { ITask } from './interfaces';
import { useState } from 'react';
import clsx from 'clsx';

// material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import StyledMenu from './StyledMenu';

interface Props {
	task: ITask;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
);

export default function Task({ task }: Props) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleMenuSetting = () => {};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton onClick={handleMenuSetting} aria-label="settings">
						<MoreVertIcon />
						{openMenu && <StyledMenu></StyledMenu>}
					</IconButton>
				}
				title={task.title}
				subheader="fecha?"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{task.body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Comentarios:</Typography>
					<Typography paragraph>Comentario</Typography>
					<Typography paragraph>Comentario 2</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
