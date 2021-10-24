import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@mui/material/Button';
import Layout from '../../../application/components/layouts/Layout';
import TextField from '@mui/material/TextField';
import TinyMCE from '../../../application/components/common/text-editor-component/TinyMCE';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { IRootState } from './../../../redux/store';
import {
	createTaskAsync,
	updateTaskAsync,
} from '../../../application/components/task/SliceTask';
import NoSSRWrapper from '../../../application/components/common/NoSSRWrapper';
import TaskModel from '../../../domain/TaskModel';

const validationSchema = yup.object({
	title: yup.string(),
	body: yup.string(),
});

function Create({
	isError,
	isLoading,
	task,
	createTaskAsync,
	updateTaskAsync,
}: PropsFromRedux) {
	const router = useRouter();
	const handleNotasClick = () => {
		router.push('/');
	};

	const initialValues = task || {
		title: '',
		body: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			if (task) {
				updateTaskAsync({
					id: task.id,
					title: values.title,
					body: values.body,
				});
			} else {
				createTaskAsync({
					title: values.title,
					body: values.body,
				});
			}
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
				{task ? 'Update una nota' : 'Crea una nota'}
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
	const { isLoading, isError, task } = taskState.creating;

	return {
		isLoading,
		isError,
		task,
	};
};

const mapDispatchToProps = {
	createTaskAsync,
	updateTaskAsync,
};

const conn = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof conn>;
export default conn(Create);
