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

		//Añadimos eventos a lista y a boton
		$.addListener($.list, "itemclick", showDetail);
		$.addListener($.readDatabase, "click", readDatabase);
	})();

	/**
	 * showDetail
	 * @description Mostramos alert con información del a película
	 * @param {Object} e
	 */
	function showDetail(e) {
		console.log("showDetail");
		
		//Mostramos la sinopsis de la pelicula en un mensaje de alerta
		alert(e.section.getItemAt(e.itemIndex).properties.film.description);
	}

	/**
	 * prepareItemList
	 * @description Preparamos la fila para su inserción en la lista 
 	 * @param {Object} row
	 */
	function readDatabase() {
		console.log("readDatabase");
		
		var db,
		    resultSet,
		    items;

		items = [];
		
		//Instalamos la base de datos, si ya existe la abrimos
		db = Ti.Database.install("/db/peliculas", "films");
		
		//Ejecutamos consulta
		resultSet = db.execute("SELECT * FROM PELICULAS");

		//Mientras existan filas válidas
		while (resultSet.isValidRow()) {
			//Preparamos vector de items de lista
			items.push(prepareItemList(resultSet));
			
			//Pasamos al siguiente registro
			resultSet.next();
		}
		
		//Cerramos registros y base de datos
		resultSet.close();
		db.close();
		
		//Establecemos items en lista
		$.section.setItems(items);
	}

	/**
	 * prepareItemList
	 * @description Preparamos la fila para su inserción en la lista 
 	 * @param {Object} row
	 */
	function prepareItemList(row) {
		console.log("prepareItemList");
		
		//Preparamos objeto pelicula accediendo al registro
		var film = {
			title : row.fieldByName("TITULO"),
			type : row.fieldByName("GENERO"),
			year : row.fieldByName("AÑO"),
			description : row.fieldByName("SINOPSIS")
		};
		
		//Devolvemos ListItem
		return {
			properties : {
				film : film
			},
			title : {
				text : film.title,
				color : "black"
			},
			type : {
				text : film.type,
				color : "black"
			},
			year : {
				text : film.year,
				color : "black"
			},
			template : "film"
		};
	}

})($.args);