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

		//Cuando la ventana se abra se ejecutará la función onOpen
		$.addListener($.win, "open", onOpen);

		//Cuando la ventana se cierre se ejecutará la función onClose
		$.addListener($.win, "close", onClose);

	})();

	/**
	 * onOpen
	 * @description Callback evento open
	 * @param {Object} e Evento con información del callback
	 */
	function onOpen(e) {
		console.log("onOpen");

		//Mostramos los indicadores de actividad
		showIndicator();
	}

	/**
	 * showIndicator
	 * @description Muestra los indicadores de actividad
	 */
	function showIndicator() {
		console.log("showIndicator");

		$.indicatorPlain.show();
		$.indicatorBig.show();
		$.indicatorPlainMessage.show();
		$.indicatorBigMessage.show();
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
		console.log("cleanController");

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
