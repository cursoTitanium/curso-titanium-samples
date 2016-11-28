/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} args
 */
var controller = (function constructor(args) {

	"use strict";

	var params,
	    controller,
	    week;

	params = args;
	controller = {};
	week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

	/**
	 * bindEvents
	 * @description Establecemos eventos del controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		//Cuando la ventana se cierre se ejecutará la función onClose
		$.addListener($.win, "close", onClose);

		//Añadimos listener al botón
		$.addListener($.showDialog, "click", showDialog);

		//Añadimos listener al diálogo
		$.addListener($.option, "click", dialogClicked);

	})();

	/**
	 * showDialog
	 * @description Mostramos el diálogo
	 * @param {Object} e Evento de callback
	 */
	function showDialog(e) {
		console.log("showDialog");

		$.option.show();
	}

	/**
	 * dialogClicked
	 * @description Callback click en diálogo
	 * @param {Object} e Evento de callback
	 */
	function dialogClicked(e) {
		console.log("dialogClicked");

		Alloy.Globals.toast("Has elegido el " + week[e.index]);
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
