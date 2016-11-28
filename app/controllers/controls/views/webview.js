/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} args
 */
var controller = (function constructor(args) {

	"use strict";

	var params,
	    controller;

	params = args;
	controller = {};

	/**
	 * bindEvents
	 * @description Establecemos eventos del controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		//Cuando la ventana se cierre se ejecutará la función onClose
		$.addListener($.win, "close", onClose);

		//Cuando cargue la web se ejecutará la funcion onLoad
		$.addListener($.webview, "load", onLoad);
	})();

	/**
	 * onLoad
	 * @description Callback cuando el webview termina la carga
	 */
	function onLoad(e) {
		console.log("onLoad");

		//Mostramos un mensaje de tipo toast en pantalla
		Alloy.Globals.toast("Evento load: " + e.url + " cargada.");
	}

	/**
	 * close
	 * @description Cierra la ventana
	 * @param {Object} e Evento con información del callback
	 */
	function close(e) {
		console.log("close");

		//Cerramos la ventana
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
		console.log("cleanController on webview.js");

		//Limpiamos el controlador
		//Quitamos los eventos
		$.removeListener();

		//Liberamos recursos
		params = null;
		controller = null;

		$ = null;
	}

	//El método close no es visible para la
	//vista al estar encapsulado dentro del
	//controlador, vamos a sacarla fuera
	controller.close = close;

	return controller;

})($.args);

//Copiamos la referencia de la función close a la variable externa
//de este modo es visible para la vista
var close = controller.close;
