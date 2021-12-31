import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Mui
import Box from '@mui/material/Box';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			router.push('/task');
		}
	}, [router.isReady]);

	return <Box></Box>;
}
