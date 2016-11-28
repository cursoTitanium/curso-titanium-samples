/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} args
 */
var controller = (function constructor(args) {

	"use strict";

	var params,
	    controller,
	    interval;

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

		//Establecemos intérvalo para llamada a startProgressBar
		interval = setInterval(startProgressBar, 1000);
	}

	/**
	 * startProgressBar
	 * @description Inicia la barra de progreso
	 */
	function startProgressBar() {
		console.log("startProgressBar");

		//Mientras no estemos en el valor máximo
		//establecido en los estilos incrementamos
		if ($.progressBar.value < $.progressBar.max) {
			$.progressBar.message = "Descargando " + ++$.progressBar.value + " de 10";
		}
		
		//Si llegamos al final limpiamos el intervalo
		if($.progressBar.value === $.progressBar.max){
			Alloy.Globals.toast("Descarga finalizada");
			clearInterval(interval);
		}
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
