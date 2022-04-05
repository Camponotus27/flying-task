export const RegisterEvent = async () => {
	navigator.serviceWorker.ready
		.then((registration) =>
			registration.periodicSync.register('get-english-dictionary', {
				minInterval: 24 * 60 * 60 * 1000,
			})
		)
		.then(() => console.log('sync registered'))
		.catch((err) => {
			console.log('Periodic Sync could not be registered!' + err);
		});
};
