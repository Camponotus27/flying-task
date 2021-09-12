import styles from './styles.module.css';
import TaskModel from '../../../domain/TaskModel';
import { useState, MouseEvent } from 'react';
import clsx from 'clsx';

// material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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

import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
	task: TaskModel;
	deleteTaskAsync(idTask: number): any;
	isDeleting: boolean;
}

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

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

export default function Task({ task, deleteTaskAsync, isDeleting }: Props) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenuSetting = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlerClickDelete = () => {
		if (confirmDelete) {
			deleteTask();
		} else {
			setConfirmDelete(true);
		}
	};

	const deleteTask = () => {
		if (!task.id) {
			//TODO: Crear notificacion  y mandar este err
			console.log('La task no tiene id', task);
		} else {
			handleClose();
			deleteTaskAsync(task.id);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
		setConfirmDelete(false);
	};
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					isDeleting ? (
						<div />
					) : (
						<IconButton
							onClick={handleMenuSetting}
							aria-label="settings"
							aria-controls="customized-menu"
							aria-haspopup="true"
						>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={task.title}
				subheader="fecha?"
			/>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Editar" />
				</StyledMenuItem>
				<StyledMenuItem onClick={handlerClickDelete}>
					{confirmDelete ? (
						<>
							<ListItemIcon>
								<DeleteIcon fontSize="small" />
							</ListItemIcon>
							<ListItemText primary="Seguro?" />
						</>
					) : (
						<>
							<ListItemIcon>
								<DeleteIcon fontSize="small" />
							</ListItemIcon>
							<ListItemText primary="Eliminar" />
						</>
					)}
				</StyledMenuItem>
			</StyledMenu>
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
