/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} params
 */
(function constructor(args) {

	"use strict";

	//Preparamos un vector con los almacenamientos
	var params = args,
	    storage = [Ti.Filesystem.applicationDataDirectory, Ti.Filesystem.resourcesDirectory, Ti.Filesystem.tempDirectory, Ti.Filesystem.applicationCacheDirectory, Ti.Filesystem.externalStorageDirectory],
	    EXTERNAL_STORAGE = 4;

	/**
	 * bindEvents
	 * @description Establecemos eventos de controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		//Añadimos listeners a los elementos de UI
		
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

		//Obtenemos contenido de TextArea
		text = $.textArea.getValue();

		//Si hay texto
		if (text.length) {
			//Obtenemos fichero texto.txt del directorio privado de la apicación y escribimos contenido
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

		//Obtenemos manejador de fichero
		file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "texto.txt");
		text = "No existe el fichero";

		//Si el fichero existe, leemos
		if (file.exists()) {
			text = file.read().text;
		}

		//Mostramos texto en Label
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

		//Obtenemos indice del botón sobre el que se hace click
		var selectedIndex = e.index;

		//Si es botón
		if (selectedIndex > -1) {
			//Si es EXTERNAL_STORAGE
			if (selectedIndex == EXTERNAL_STORAGE) {
				//Comprobamos permisos
				checkExternalStorage(selectedIndex);
			} else {
				//Listamos directorios y ficheros
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

		//Si el almacenamiento externo está disponible
		if (Ti.Filesystem.isExternalStoragePresent) {
			//Si tenemos permisos
			if (Ti.Filesystem.hasStoragePermissions()) {
				//Listamos directorio y ficheros
				listDirectory(storageIndex);
			} else {
				//Solicitamos permisos
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

		//Obtenemos el listado del directorio
		var itemList = [],
		    directoryList = Ti.Filesystem.getFile(storage[storageIndex]).getDirectoryListing();

		//Preparamos lista de items con el contenido del directorio
		itemList = directoryList.map(function(directory) {
			//Devolvemos objeto ListItem
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

		//Si el directorio está vacío
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

		//Establecemos items en sección
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
