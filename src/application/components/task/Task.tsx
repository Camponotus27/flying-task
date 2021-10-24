import styles from './styles.module.css';
import TaskModel from '../../../domain/TaskModel';
import { useState, MouseEvent } from 'react';
import clsx from 'clsx';

// material UI
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import withStyles from '@mui/styles/withStyles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
interface Props {
	task: TaskModel;
	deleteTaskAsync(idTask: number): void;
	isDeleting: boolean;
	setTaskEdit(task: TaskModel): void;
}

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		//getContentAnchorEl={null}
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
			//backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				//color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			//transition: theme.transitions.create('transform', {
			//	duration: theme.transitions.duration.shortest,
			//}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
);

export default function Task({
	task,
	deleteTaskAsync,
	isDeleting,
	setTaskEdit,
}: Props) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const router = useRouter();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const actionFeature = false;

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

	const handlerClickEdit = () => {
		setTaskEdit(task);
		router.push('task/create');
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
							size="large"
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
				<StyledMenuItem onClick={handlerClickEdit}>
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
				<div dangerouslySetInnerHTML={{ __html: task.body }} />
			</CardContent>
			{actionFeature && (
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites" size="large">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share" size="large">
						<ShareIcon />
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						size="large"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
			)}
			{actionFeature && (
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Comentarios:</Typography>
						<Typography paragraph>Comentario</Typography>
						<Typography paragraph>Comentario 2</Typography>
					</CardContent>
				</Collapse>
			)}
		</Card>
	);
}
