import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import Layout from './../../../components/layouts/Layout';
import TextField from '@material-ui/core/TextField';
import TinyMCE from '../../../components/common/text-editor-component/TinyMCE';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import { IRootState } from './../../../redux/store';
import { createTaskAsync } from './../../../components/task/SliceTask';
import { ITask } from './../../../components/task/interfaces';
import NoSSRWrapper from './../../../components/common/NoSSRWrapper';

const validationSchema = yup.object({
	title: yup.string(),
	body: yup.string(),
});

function Create({ isError, isLoading, createTaskAsync }: PropsFromRedux) {
	const router = useRouter();

	const handleNotasClick = () => {
		router.push('/');
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const task: ITask = { title: values.title, body: values.body };
			createTaskAsync(task);
		},
	});

	let body;
	if (isLoading) body = <h1>Cargando</h1>;
	else if (isError) body = <h1>Error</h1>;
	else
		body = (
			<FormikProvider value={formik}>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id="title"
						name="title"
						label="Titulo"
						variant="outlined"
						value={formik.values.title}
						onChange={formik.handleChange}
						error={formik.touched.title && Boolean(formik.errors.title)}
						helperText={formik.touched.title && formik.errors.title}
					/>
					<NoSSRWrapper>
						<TinyMCE {...formik.getFieldProps('body')}></TinyMCE>
					</NoSSRWrapper>
					<Button color="primary" variant="contained" fullWidth type="submit">
						Guardar
					</Button>
				</form>
			</FormikProvider>
		);

	return (
		<Layout>
			<Typography variant="h2" align="center">
				Crea una nota
			</Typography>
			<Button variant="contained" color="primary" onClick={handleNotasClick}>
				Notas
			</Button>
			{body}
		</Layout>
	);
}

const mapStateToProps = (state: IRootState) => {
	const taskState = state.tasks;
	const { isLoading, isError } = taskState.creating;

	return {
		isLoading,
		isError,
	};
};

const mapDispatchToProps = {
	createTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(Create);
