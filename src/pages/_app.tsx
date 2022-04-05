import '../../styles/globals.css';
import { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from './../redux/store';
import ThemeProvider from './../application/components//common/ThemeProvider';

import { requestPermissionNotificationsIfDeviceDoNotHave } from './../lib/notifications/local/local-notifications';
import { RegisterEvent } from './../lib/events/sw-events';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	useEffect(() => {
		requestPermissionNotificationsIfDeviceDoNotHave();

		RegisterEvent();
	}, []);

	return getLayout(
		<Provider store={store}>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}
