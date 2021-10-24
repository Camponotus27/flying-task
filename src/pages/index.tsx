import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../application/components/layouts/Layout';

// Mui
import Button from '@mui/material/Button';

export default function Home() {
	const router = useRouter();

	const handleEnglishDictionaryClick = () => {
		router.push('/english-dictionary');
	};
	const handleTaskClick = () => {
		router.push('/task');
	};

	return (
		<Layout>
			<Button
				variant="contained"
				color="primary"
				onClick={handleTaskClick}
				style={{ margin: 20 }}
			>
				Task
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={handleEnglishDictionaryClick}
				style={{ margin: 20 }}
			>
				English Dictionary
			</Button>
		</Layout>
	);
}
