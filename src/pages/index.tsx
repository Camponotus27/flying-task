import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../application/components/layouts/Layout';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/task');
	}, []);
	return <Layout>Hola</Layout>;
}
