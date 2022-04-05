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
			data: {
				dateOfArrival: Date.now(),
			},
			//renotify: true,
			vibrate: [200, 100, 200, 100, 200, 100, 200],
			actions: [
				{ action: 'notification-click-test', title: 'notificationClickTest' },
				{
					action: 'notification-click-test-2',
					title: 'notificationClickTest2',
				},
			],
		};

		await registration.showNotification(title, options);
	}
};

export const requestPermissionNotificationsIfDeviceDoNotHave =
	async (): Promise<boolean> => {
		if (statusPermissionNotifications()) return true;

		Notification.requestPermission();
		return statusPermissionNotifications();
	};

const statusPermissionNotifications = (): boolean => {
	return Notification.permission == 'granted';
};

const addEventListenerNotifications = async (): Promise<void> => {
	console.log('addEventListenerNotifications');
	/*
	if ('actions' in Notification.prototype) {
		// Action buttons are supported.
		console.log('Actions buttons are supported');
	} else {
		// Action buttons are NOT supported.
		console.log('Actions buttons are NOT supported');
	}*/

	/*
		// other form the use notifications
		let notification = new Notification(title);
		notification.onclick = function (event) {
			event.preventDefault(); // evitar que el navegador enfoque la pestaña de notificaciones
			window.open('http://www.mozilla.org', '_blank');
		};*/

	/*
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
	};*/

	/*
	
	// This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
  */
};
