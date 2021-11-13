import React from 'react';
import { ThemeProvider as Provider } from '@mui/material/styles';
import theme from '../../../lib/theme';
type Props = {
	children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
	return <Provider theme={theme}>{children}</Provider>;
};

export default ThemeProvider;
