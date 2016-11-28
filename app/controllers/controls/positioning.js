/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} args
 */
var controller = (function constructor(args) {

	"use strict";

	var params = args,
	controller = {};

	/**
	 * bindEvents
	 * @description Establecemos eventos del controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		//Cuando la ventana se cierre se ejecutará la función onClose
		$.addListener($.win, "close", onClose);

		//Añadimos evento click a items de la lista
		$.addListener($.list, "itemclick", openItem);

	})();

	/**
	 * openItem
	 * @description Callback click en item de lista
	 * @param {Object} e
	 */
	function openItem(e) {
		console.log("openItem");

		//Obtenemos ListItem sobre el que hemos pulsado
		//Usamos para ellos la sección de la lista
		var listItem = e.section.getItemAt(e.itemIndex),
		    controller = "controls/positioning/" + listItem.properties.itemId;

		Alloy.createController(controller).getView().open();
	}

	/**
	 * close
	 * @description Cierra la ventana
	 */
	function close(e){
		console.log("close");
		
		$.win.close();	
	}
	
	/**
	 * onClose
	 * @description Callback evento close
	 * @param {Object} e Evento con información del callback
	 */
	function onClose(e) {
		console.log("onClose");

		cleanController();
	}

	/**
	 * cleanController
	 * @description Callback "close". Liberamos memoria en el controlador
	 * @param {Object} e
	 */
	function cleanController(e) {
		console.log("cleanController");

		//Limpiamos el controlador
		//Quitamos los eventos
		$.removeListener();

		//Liberamos recursos
		params = null;
		controller = null;

		$ = null;
	}	

	controller.close = close;

	return controller;

})($.args);

var close = controller.close;