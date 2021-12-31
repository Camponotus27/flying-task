import { ReactNode } from 'react';
import Footer from './footers/Footer';
import BottomMenu from './bottom-menu/BottomMenu';
import TopMenu from './top-menu/TopMenu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<>
			<TopMenu />
			<Container>
				<main>
					<Box gap={2} display="flex" flexDirection="column">
						{children}
					</Box>
				</main>
			</Container>
			<BottomMenu />
		</>
	);
}
