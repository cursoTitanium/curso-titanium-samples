/**
 * constructor
 * @description Constructor del controlador
 * @param {Object} params
 */
(function constructor(args) {

	"use strict";

	var params = args,
	    httpClient;

	//Creamos Http Client
	httpClient = Ti.Network.createHTTPClient({
		onload : success,
		onerror : error,
		timeout : 5000
	});

	/**
	 * bindEvents
	 * @description Establecemos eventos de controlador
	 */
	(function bindEvents() {
		console.log("bindEvents");

		$.addListener($.getRequest, "click", getRequest);
		$.addListener($.postRequest, "click", postRequest);
	})();

	/**
	 * getRequest
	 * @description Realiza una petición GET
	 * @param {Object} e Evento de callback
	 */
	function getRequest(e) {
		console.log("getRequest");

		//Si hay una petición en marcha abortamos.
		httpClient.abort();	
		
		//Abrimos conexión
		httpClient.open("GET", "http://httpbin.org/html");
		
		//Enviamos petición
		httpClient.send();
	}

	/**
	 * postRequest
	 * @description Realiza una petición GET
	 * @param {Object} e Evento de callback
	 */
	function postRequest(e) {
		console.log("postRequest");

		//Si hay una petición en marcha abortamos.
		httpClient.abort();
		
		//Abrimos conexión	
		httpClient.open("POST", "http://httpbin.org/post");
		
		//Enviamos petición
		httpClient.send({
			message: "Mi mensaje es este."
		});
	}

	/**
	 * success
	 * @description Callback éxito
	 * @param {Object} e Evento de callback
	 */
	function success() {
		console.log("success");

		$.response.setText("SUCCESS: " + this.getResponseText());
	}

	/**
	 * error
	 * @description Callback fracaso
	 * @param {Object} e Evento de callback
	 */
	function error() {
		console.log("error");

		$.response.setText("ERROR: " + this.getResponseText());
	}

})($.args); 