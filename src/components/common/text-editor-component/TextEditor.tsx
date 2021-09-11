import TinyMCE from './TinyMCE';

interface PropTextEditor {
	onChange(event: object): void;
}

export default function TextEditor({ onChange }: PropTextEditor) {
	return <TinyMCE onChange={onChange}></TinyMCE>;
}
