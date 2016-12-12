/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} params
 */
(function constructor(args) {

	"use strict";

	var params = args,
	    storage = [Ti.Filesystem.applicationDataDirectory, Ti.Filesystem.resourcesDirectory, Ti.Filesystem.tempDirectory, Ti.Filesystem.applicationCacheDirectory, Ti.Filesystem.externalStorageDirectory],
	    EXTERNAL_STORAGE = 4;

	/**
	 * bindEvents
	 * @description Establecemos eventos de controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		$.addListener($.readFile, "click", readFile);
		$.addListener($.writeFile, "click", writeFile);
		$.addListener($.basicOperations, "click", switchBasicOperations);
		$.addListener($.listingDirectories, "click", switchDirectoryListing);
		$.addListener($.writeFile, "click", writeFile);
		$.addListener($.selectDirectory, "click", openSelectDirectory);
		$.addListener($.dialog, "click", selectDirectory);
	})();

	/**
	 * writeFile
	 * @description Escribe en fichero
	 * @param {Object} e Evento de callback
	 */
	function writeFile(e) {
		console.log("writeFile");

		var text;

		text = $.textArea.getValue();

		if (text.length) {
			Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt").write(text);
			Alloy.Globals.toast("Fichero texto.txt guardado.");
		} else {
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

	/**
	 * openSelectDirectory
	 * @description Abrimos dialogo de opciones
	 * @param {Object} e Evento de callback
	 */
	function openSelectDirectory(e) {
		console.log("openSelectDirectory");

		$.dialog.show();
	}

	/**
	 * selectDirectory
	 * @description Cambiamos el directorio
	 * @param {Object} e Evento de callback
	 */
	function selectDirectory(e) {
		console.log("selectDirectory");

		var selectedIndex = e.index;

		if (selectedIndex > -1) {
			if (selectedIndex == EXTERNAL_STORAGE) {
				checkExternalStorage(selectedIndex);
			} else {
				listDirectory(selectedIndex);
			}
		}
	}

	/**
	 * checkExternalStorage
	 * @description Comprueba que hayan permisos para acceder y los solicita
	 * @param {Object} storageIndex
	 */
	function checkExternalStorage(storageIndex) {
		console.log("checkExternalStorage");

		//Comprueba permisos
		function checkPermissions(e) {
			if (e.success) {
				listDirectory(storageIndex);
			} else {
				alert("Error otorgando permisos");
			}
		}

		if (Ti.Filesystem.isExternalStoragePresent) {
			if (Ti.Filesystem.hasStoragePermissions()) {
				listDirectory(storageIndex);
			} else {
				Ti.Filesystem.requestStoragePermissions(checkPermissions);
			}
		}
	}

	/**
	 * listDirectory
	 * @description Lista ficheros y directorios
	 * @param {Object} storageIndex
	 */
	function listDirectory(storageIndex) {
		console.log("listDirectory");

		var itemList = [],
		    directoryList = Ti.Filesystem.getFile(storage[storageIndex]).getDirectoryListing();

		console.log(JSON.stringify(directoryList));

		itemList = directoryList.map(function(directory) {
			return {
				properties : {
					title : directory,
					color : "black",
					accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_NONE,
					left : 16,
					right : 16
				}
			};
		});

		if (!itemList.length) {
			itemList.push({
				properties : {
					title : "No hay elementos que listar",
					color : "black",
					accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_NONE,
					left : 16,
					right : 16
				}
			});
		}

		$.section.setItems(itemList);
	}

	/**
	 * switchBasicOperations
	 * @description Cambia a la pagina 1
	 * @param {Object} e
	 */
	function switchBasicOperations(e) {
		$.pager.scrollToView($.page1);
	}

	/**
	 * switchDirectoryListing
	 * @description Cambia a la pagina 2
	 * @param {Object} e
	 */
	function switchDirectoryListing(e) {
		$.pager.scrollToView($.page2);
	}

})($.args);
