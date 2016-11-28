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
	 * close
	 * @description Cierra la ventana
	 * @param {Object} e Evento de callback
	 */
	function close(e) {
		console.log("close");

		$.win.close();
	}

	controller.close = close;

	return controller;

})($.args);

var close = controller.close;