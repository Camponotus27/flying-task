import { useEffect } from 'react';
import Layout from '../../application/components/layouts/Layout';
import { useRouter } from 'next/router';

const data = [
	{
		Canal: 1,
		Temperatura: 20,
		PH: 20,
		PorcentajeHumerdad: 30,
		disponible: true,
	},
	{
		Canal: 3,
		Temperatura: 40,
		PH: 20,
		PorcentajeHumerdad: 1,
		disponible: false,
	},
	{
		Canal: 5,
		Temperatura: 70,
		PH: 20,
		PorcentajeHumerdad: 40,
		disponible: true,
	},
	{
		Canal: 6,
		Temperatura: 50,
		PH: 20,
		PorcentajeHumerdad: 50,
		disponible: true,
	},
	{
		Canal: 7,
		Temperatura: 2,
		PH: 20,
		PorcentajeHumerdad: 70,
		disponible: false,
	},
];

function PageTask({}) {
	const router = useRouter();
	return (
		<Layout>
			{data.map((d) => {
				return (
					<div
						onClick={() => {
							alert('Ejecutar Canal ' + d.Canal);
						}}
						key={d.Canal}
						className="sebas-clase"
					>
						<h1>
							Canal {d.Canal}{' '}
							<span
								style={{ color: 'red', fontSize: 20, verticalAlign: 'center' }}
							>
								{!d.disponible || 'Canal no disponible'}
							</span>
						</h1>
						<div>Terperatura: {d.Temperatura}º</div>
						<div>PH: {d.PH} </div>
						<div>Porcentaje Humerdad: {d.PorcentajeHumerdad}%</div>
					</div>
				);
			})}
		</Layout>
	);
}

export default PageTask;
