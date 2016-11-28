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

		//Establecemos listener para los cambios en los pickers
		$.addListener($.picker, "change", onDropdownChange);
		$.addListener($.datePicker, "change", onDatePickerChange);

	})();

	/**
	 * onDropdownChange
	 * @description Callback evento change
	 * @param {Object} e Evento con información del callback
	 */
	function onDropdownChange(e){
		console.log("onDropdownChange");
		
		Alloy.Globals.toast("Se ha seleccionado: " + e.source.getSelectedRow(e.columnIndex).getTitle())
	}
	
	/**
	 * onDatePickerChange
	 * @description Callback evento open
	 * @param {Object} e Evento con información del callback
	 */	
	function onDatePickerChange(e){
		console.log("onDatePickerChange");
		
		Alloy.Globals.toast("Se ha seleccionado la fecha: " + e.value);
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