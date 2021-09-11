import dynamic from 'next/dynamic';
import React from 'react';

interface PropsNoSSRWrapper {
	children: JSX.Element;
}

const NoSSRWrapper = (props: PropsNoSSRWrapper) => (
	<React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
	ssr: false,
});
