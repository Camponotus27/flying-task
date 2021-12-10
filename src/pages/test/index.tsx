import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function Test() {
	useEffect(() => {
		axios
			.post('/api/test-error')
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <Typography></Typography>;
}
