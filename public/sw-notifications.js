import { createScheduledNotification } from './../src/lib/notifications/local/local-notifications.js';

self.addEventListener('notificationclick', function (event) {
	const clickedNotification = event.notification;
	clickedNotification.close();

	if (!event.action) {
		// Was a normal notification click
		console.log('Notification Click.');
		return;
	}

	switch (event.action) {
		case 'coffee-action':
			console.log("User ❤️️'s coffee.");
			break;
		case 'doughnut-action':
			console.log("User ❤️️'s doughnuts.");
			break;
		case 'gramophone-action':
			console.log("User ❤️️'s music.");
			break;
		case 'atom-action':
			console.log("User ❤️️'s science.");
			break;
		default:
			console.log(`Unknown action clicked: '${event.action}'`);
			break;
	}
});

self.addEventListener('periodicsync', (event) => {
	if (event.tag == 'get-english-dictionary') {
		event.waitUntil(createScheduledNotification());
	}
});
