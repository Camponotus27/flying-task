import styles from './styles.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function TopMenu() {
	return (
		<Box className={styles.heightHeader}>
			<Box className={styles.containerHeader} sx={{ bgcolor: 'primary.main' }}>
				<Typography variant="h3" component="h2">
					TF
				</Typography>
			</Box>
		</Box>
	);
}
