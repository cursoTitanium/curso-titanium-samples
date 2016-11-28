/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} params
 */
(function constructor(args) {

	"use strict";
	
	var params = args;
	
	/**
	 * bindEvents
	 * @description Establecemos eventos de controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");
		
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
		var listItem = e.section.getItemAt(e.itemIndex);
		var controller = "controls/" + listItem.properties.itemId;
		
		Alloy.createController(controller).getView().open();
	}

})($.args);