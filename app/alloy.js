/**
 * Alloy.js
 * @description Fichero destinado a la creación de variables globales
 * visibles desde toda la aplicación
 */

/**
 * Toast
 * @description Muestra un mensaje de tipo toast
 * @param {String} message
 * @param {String} duration short, long
 *
 */
Alloy.Globals.toast = function(message, duration) {
	Ti.UI.createNotification({
		message : message,
		duration : (duration === "short") ? Ti.UI.NOTIFICATION_DURATION_SHORT : Ti.UI.NOTIFICATION_DURATION_LONG
	}).show();
};
