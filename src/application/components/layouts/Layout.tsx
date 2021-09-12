import { ReactNode } from 'react';
import Footer from './footers/Footer';
import Container from '@material-ui/core/Container';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<Container>
			<main>{children}</main>
			<Footer />
		</Container>
	);
}
