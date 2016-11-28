/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} params
 */
(function constructor(args) {

	"use strict";

	var params = args,
	    storage = [];

	/**
	 * bindEvents
	 * @description Establecemos eventos de controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		$.addListener($.readFile, "click", readFile);
		$.addListener($.writeFile, "click", writeFile);
	})();

	/**
	 * writeFile
	 * @description Escribe en fichero
	 * @param {Object} e Evento de callback
	 */
	function writeFile(e){
		console.log("writeFile");

		var text;
		
		text = $.textArea.getValue();
		
		if(text.length){
			Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt").write(text);
			Alloy.Globals.toast("Fichero texto.txt guardado.");
		}else{
			Alloy.Globals.toast("Text Area vacío. No guardamos el fichero");
		}
	}

	/**
	 * readFile
	 * @description Lee fichero
	 * @param {Object} e Evento de callback
	 */
	function readFile(e) {
		console.log("readFile");
		
		var file,
		    text;

		file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt");
		text = "No existe el fichero";

		if (file.exists()) {
			text = file.read().text;
		}
		
		$.fileContent.setText(text);
	}

})($.args);
