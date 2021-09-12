import { ReactNode } from 'react';
import Footer from './footers/Footer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<Container>
			<main>
				<Box gridGap={20} display="flex" flexDirection="column">
					{children}
				</Box>
			</main>
			<Footer />
		</Container>
	);
}
