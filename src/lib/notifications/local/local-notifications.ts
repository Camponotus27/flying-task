/// <reference lib="webworker" />
//@ts-ignore
declare var self: ServiceWorkerGlobalScope;

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

		/*
		// other form the use notifications
		let notification = new Notification(title);
		notification.onclick = function (event) {
			event.preventDefault(); // evitar que el navegador enfoque la pestaña de notificaciones
			window.open('http://www.mozilla.org', '_blank');
		};*/
		registration.showNotification(title, options);

		navigator.serviceWorker.addEventListener(
			'notificationclick',
			function (event) {
				console.log('Notification click: tag');
			}
		);
	}
};

export const requestPermissionNotifications = async (): Promise<boolean> => {
	Notification.requestPermission();
	return statusPermissionNotifications();
};

const statusPermissionNotifications = (): boolean => {
	return Notification.permission == 'granted';
};

export const addEventListenerNotifications = async (): Promise<void> => {
	console.log('addEventListenerNotifications');

	if ('actions' in Notification.prototype) {
		// Action buttons are supported.
		console.log('Actions buttons are supported');
	} else {
		// Action buttons are NOT supported.
		console.log('Actions buttons are NOT supported');
	}

	self.addEventListener('push', function (event) {
		if (event.data) {
			console.log('This push event has data: ', event.data.text());
		} else {
			console.log('This push event has no data.');
		}
	});

	self.onnotificationclick = (event) => {
		event.waitUntil(() =>
			console.log('Notification click: tag ', event.target)
		);
	};
};
