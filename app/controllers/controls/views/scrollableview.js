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

		//Añadimos listeners a al click de etiquetas del menú superior
		["page1", "page2", "page3"].forEach(function(page) {
			$.addListener($[page], "click", scrollToPage);
		});
	})();

	/**
	 * scrollToPage
	 * @description Movemos ScrollableView a una vista
	 * @param {Object} e Evento
	 */
	function scrollToPage(e) {
		console.log("scrollToPage");

		var toView;

		switch(e.source.id) {
		case "page1":
			//Podemos acceder al indice 0 (primera página)
			toView = 0;
			break;
		case "page2":
			//Podemos acceder a una vista (segunda página)
			toView = $.view2;
			break;
		case "page3":
			//Indice 2, tercera página
			toView = 2;
			break;
		default:
			toView = 0;
		}

		$.scrollableView.scrollToView(toView);
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
