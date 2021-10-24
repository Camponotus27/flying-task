import { ReactNode } from 'react';
import Footer from './footers/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<Container>
			<main>
				<Box gap={2} display="flex" flexDirection="column">
					{children}
				</Box>
			</main>
			<Footer />
		</Container>
	);
}
