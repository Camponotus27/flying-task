import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useField, Form, FormikProps, Formik } from 'formik';

interface PropTextEditor {
	//onChange(event: object): void;
	name: string;
	type: string;
	label: string;
}

export default function TinyMCE({ ...props }: any) {
	const [initialValue, setInitialValue] = useState('');

	const editorRef: any = useRef({});
	const [field, meta, helpers] = useField(props);
	const { value } = meta;
	const { setValue } = helpers;
	const onChange = () => {
		if (editorRef.current) {
			setValue(editorRef.current.getContent());
		}
	};

	useEffect(() => {
		setInitialValue(value);
	}, []);

	return (
		<>
			<Editor
				apiKey="d5bcrjnaqf56roztsmw8fcsw5pc6k36hdw8xztx9d00ldbx2"
				onInit={(evt, editor) => (editorRef.current = editor)}
				onChange={onChange}
				initialValue={initialValue}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</>
	);
}
