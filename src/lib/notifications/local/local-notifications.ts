export const createScheduledNotification = async (
	tag: string,
	title: string,
	body: string,
	timestamp: number
): Promise<void> => {
	if (!statusPermissionNotifications()) return;

	const registration = await navigator.serviceWorker.getRegistration();
	if (registration) {
		const options: NotificationOptions = {
			tag,
			body,
			timestamp,
			//badge: './assets/icons/ic_launcher-192x192.png',
			//icon: ' /assets/icons/ic_launcher-192x192.png',
			//data: {
			//	dateOfArrival: Date.now(),
			//},
			//renotify: true,
			vibrate: [200, 100, 200, 100, 200, 100, 200],
			actions: [
				{ action: 'notificationClickTest', title: 'notificationClickTest' },
			],
		};

		registration.showNotification(title, options);
	}
};

const requestPermissionNotifications = async (): Promise<boolean> => {
	Notification.requestPermission();
	return statusPermissionNotifications();
};

const statusPermissionNotifications = (): boolean => {
	return Notification.permission == 'granted';
};

export const addEventListenerNotifications = async (): Promise<void> => {
	console.log('addEventListenerNotifications');

	const registration = await navigator.serviceWorker.getRegistration();
	if (registration) {
		registration.addEventListener('notificationclick', (event) => {
			console.log('Notification click: tag ', event.target);
		});
	} else {
		console.log('registration is null');
	}
};
