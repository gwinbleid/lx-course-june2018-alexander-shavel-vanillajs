/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
function Model() {

    /**
	 * Fetch the orders of the currently active order.
	 *
     * @param {String} request URI
     * 
	 * @returns {Promise} the promise object will be resolved once the Orders objects gets loaded.
	 *
	 * @public
	 */
    this.fetchOrders = function (requestURL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            
            req.open("GET", requestURL, true);
            
            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

			req.addEventListener("error", function () {
				reject(new Error("Network error"));
			});
            
            req.send(null);
        });
    }

    /**
	 * Fetch the unique Order by id.
	 *
     * @param {String} Identificator of fetching Product
     * 
	 * @returns {Promise} the promise object will be resolved once the Order object gets loaded.
	 *
	 * @public
	 */
    this.fetchOrderId = function(id) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            
            req.open("GET", 'http://localhost:3000/api/Orders/' +id, true);

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            req.addEventListener("error", function () {
				reject(new Error("Network error"));
            });
            
            req.send(null);
        })
    }

    /**
	 * Save ship Data / Customer Info to database.
	 *
     * @param {String} URL of request
     * 
     * @param {Object} Body with contained secondary info
     * 
	 * @returns {Promise} the promise object will be resolved once the Secondary Info object gets saved.
	 *
	 * @public
	 */
    this.saveSecondaryInfo = function(URL, body) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open("PATCH", URL, true);
            req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            req.send(body);

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            req.addEventListener("error", function () {
				reject(new Error("Network error"));
            });
        })
    }

    /**
	 * Fetch Product entities
	 *
     * @param {String} ID of Order which contain needful of products
     * 
	 * @returns {Promise} the promise object will be resolved once the Products object gets loaded.
	 *
	 * @public
	 */
    this.fetchProducts = function(id) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open("GET", 'http://localhost:3000/api/OrderProducts', true);

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    var filteredProducts = JSON.parse(req.responseText).filter(function (product) {
                        for (var key in product) {
                            if (product.orderId == id) {
                                return true;
                            }
                        }
                        return false;
                    });
                    resolve(filteredProducts);
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            req.addEventListener("error", function () {
				reject(new Error("Network error"));
            });
            req.send();
        })
    }

     /**
	 * Create Order/Product Entity
	 *
     * @param {String} URL that needs for request
     * 
     * @param {Object} Body of the request which contain Entity properties
     * 
	 * @returns {Promise} the promise object will be resolved once the Order/Products entity was created.
	 *
	 * @public
	 */
    this.createEntity = function(URL, body) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            
            req.open('POST', URL, true);
            req.setRequestHeader('Content-type', 'application/json; charset=utf-8'); 

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));  
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });
            
            req.addEventListener("error", function () {
                reject(new Error("Network error"));
            });
            
            req.send(body);
            return false;
        })
    }

    /**
	 * Remove order entity with specific ID
	 *
     * @param {String} URL of request which contain order's ID
     * 
	 * @returns {Promise} the promise object will be resolved once the Order will successfully delete.
	 *
	 * @public
	 */
    this.deleteOrder = function(URL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('DELETE', URL, true);

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            req.addEventListener("error", function () {
				reject(new Error("Network error"));
            });

            req.send(null);
        })
    }

    /**
	 * Remove product entity with specific ID
	 *
     * @param {String} URL of request which contain product's ID
     * 
	 * @returns {Promise} the promise object will be resolved once the Product will successfully delete.
	 *
	 * @public
	 */
    this.deleteProduct = function(URL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('DELETE', URL, true);

            req.addEventListener("load", function () {
                if (req.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            req.addEventListener("error", function () {
				reject(new Error("Network error"));
            });

            req.send(null);
        })
    }
}