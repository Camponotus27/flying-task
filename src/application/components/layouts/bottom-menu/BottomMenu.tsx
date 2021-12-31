import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Paper from '@mui/material/Paper';

import { useRouter } from 'next/router';

export default function BottomMenu() {
	const router = useRouter();

	const [value, setValue] = useState('recents');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		router.push(`/${newValue}`);
		setValue(newValue);
	};

	useEffect(() => {
		if (router.isReady) {
			setTimeout(() => {
				setValue(router.pathname.split('/')[1]);
			}, 0); // porque con cero funciona? ni idea
		}
	}, [router.isReady]);

	return (
		<Paper className={styles.container}>
			<BottomNavigation
				className={styles.navigation}
				value={value}
				onChange={handleChange}
			>
				<BottomNavigationAction
					label="Task"
					value="task"
					icon={<TaskAltIcon />}
				/>
				<BottomNavigationAction
					label="English Dictionary"
					value="english-dictionary"
					icon={<CalendarTodayIcon />}
				/>
			</BottomNavigation>
		</Paper>
	);
}
