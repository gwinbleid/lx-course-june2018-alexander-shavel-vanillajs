/**
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
function Controller(view, model) {
    "use strict";

    var that = this;

    /***********  Secondary methods  */

    /**
    * Initializing of secondaryInfo Events
    *
    * @private
    */
    function _initSecondaryInfoEvents() {
        var button = view.getButtonClass();
        
        for(var i = 0; i < button.length; i++) {
            (function(i) {
                button[i].addEventListener('click', that._switchOrderInfo);
            })(i);
        }

        var editShip = view.getEditShipButton(),
        editCust = view.getEditCustButton(),
        saveShipData = view.getSaveShipData(),
        saveCustData = view.getSaveCustData();

        editShip.addEventListener('click', that.activateShipEdit);
        editCust.addEventListener('click', that.activateCustEdit);
        saveShipData.addEventListener('click', that.saveShipInfo);
        saveCustData.addEventListener('click', that.saveCustomerInfo);
    }

    /**
    * Initializing events of product section
    *
    * @private
    */
    function _initProductSectionEvents() {
        var searchButton = view.getSearchProductButton();
        var refreshButton = view.getRefreshProductButton();
        var addItem = view.getAddProductButton();
        
        searchButton.addEventListener('click', that._searchProducts);
        refreshButton.addEventListener('click', that._refreshProductsSearch);
        addItem.addEventListener('click', that._openProductModal);

        
    }

    /**
    * Initializing deleting of products events
    *
    * @private
    */
    function _initTableItemsExpirationsEvents() {
        var itemExpiration = view.getExpirationButtons();
        
            for(var m = 0; m < itemExpiration.length; m++) {
                (function(index) {
                    itemExpiration[index].addEventListener('click', that._deleteProductItem);
                })(m);
            }
    }

    /**
    * Initializing Sorting Events
    *
    * @private
    */
    function _initTableHeadSorting() {
        var thArr = view.getTH();

        for(var m = 0; m < thArr.length; m++) {
            (function(index) {
                thArr[index].addEventListener('click', that._sortInit);
            })(m);
        }
    }


    /**
    * Secondary function for sorting whith execute ascending sorting
    *
    * @param {Object} first Object of sorting pair
    *
    * @param {Object} second Object of sorting pair
    *
    * @private
    */
    function _compareAsc(a, b) {
        if (a.getAttribute('data-type') === 'num' && b.getAttribute('data-type') === 'num') {
            if (parseInt(a.innerHTML.toLowerCase()) > parseInt(b.innerHTML.toLowerCase())) { return 1; }
        } else {
            if (a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase()) { return 1; }
        }
    }

    /**
    * Secondary function for sorting whith execute descending sorting
    *
    * @param {Object} first Object of sorting pair
    *
    * @param {Object} second Object of sorting pair
    *
    * @private
    */
    function _compareDesc(a, b) {
        if (a.getAttribute('data-type') === 'num' && b.getAttribute('data-type') === 'num') {
            if (parseInt(a.innerHTML.toLowerCase()) < parseInt(b.innerHTML.toLowerCase())) { return 1; }
        } else {
            if (a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase()) { return 1; }
        }
    }

    function _initMap(data) {
        var map = new google.maps.Map(view.getMap(), {
            zoom: 13,
            center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        view.vGeocodeAddress(geocoder, map, data);
    }

    /**
    * Initialize events for showing orders' details
    *
    * @private
    */
    function _initShowDetailEvent() {
        var orders = view.getOrdersList();
        for(var i = 0; i < orders.length; i++) {
            (function(i) {
                orders[i].addEventListener('click', that._onShowDetail);
            })(i);
        }
    }



    /**
     * Initialize Order butoons click event handlers, fetch Orders
     *
     * @private
     */
    this.initialize = function() {
        // initial some events
        
        var preventOrderCreate = view.getCancelOrderAddingButton(),
            preventProductCreate = view.getCancelProductAddingButton();

        var sideBarSearch = view.getSidebarSearch(),
            sideBarRefresh = view.getSidebarRefresh(),
            deleteOrder = view.getDeleteOrderButton(),
            addOrderButton = view.addOrderButton(),
            closeBtn = view.getClosebtn(),
            orderCreateForm = view.getOrderCreateButton(),
            productCreateForm = view.getProductCreateForm();
    
        orderCreateForm.addEventListener('submit', that._sendOrder);
        productCreateForm.addEventListener('submit', that._sendProduct);
        sideBarSearch.addEventListener('click', that._searchOrdersSidebar);
        sideBarRefresh.addEventListener('click', that._refreshOrdersSidebar);
        deleteOrder.addEventListener('click', that._deleteOrderItem);
        addOrderButton.addEventListener('click', that._openModal);
        closeBtn.forEach(clB => {
            clB.addEventListener('click', that._closeModal);
        });

        preventOrderCreate.addEventListener('click', that._preventOrderCreate);
        preventProductCreate.addEventListener('click', that._preventProductCreate);
        
        view.vDisplaySpinnerTrue();
        model
            .fetchOrders("http://localhost:3000/api/Orders")
            .then(function(result) {
                view.viewOrdersList(result);
            })
            .then(function(result) {
                _initShowDetailEvent()
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    this._onShowDetail = function(evt) {
        
        var target = evt.target;
        var orders = view.getOrdersList();
        orders.forEach(function(order) {order.classList.remove('active_list_item');})

        while (target.className != 'orders_list_item') {
            target = target.parentNode;
        }
    
        target.classList.add('active_list_item');

        view.vDisplaySpinnerTrue();
        model.
            fetchOrderId(target.id)
            .then(function(result) {
                view.vClearArticle();
                view.vShowOrderInfo(result);
                view.vShowOrderSecondaryInfo(result);

                _initMap(result);
                
                return model.fetchProducts(result.id);

            })
            .then(function(result) {
                view.vShowTableOfProducts(result);
                view.vDrawTable(result);
            })
            .then(function(result) {
                _initSecondaryInfoEvents();
                _initProductSectionEvents();
                _initTableItemsExpirationsEvents();
                _initTableHeadSorting();
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
            
            
    };

    this._switchOrderInfo = function(e) {
        var target = e.target;

        while (!target.classList.contains('button')) {
            target = target.parentNode;
        }

        
    
        
    
        if(target.classList.contains('shipping_data')) {
            view.vSwitchtoShipData();
        } else if(target.classList.contains('customer_data')) {
           view.vSwitchtoCustomerData()
        } else if (target.classList.contains('mapping_data')) {
            view.vSwitchtoMapData();
        }
    }

    this.activateShipEdit = function() {
        view.vActivateShipEditForm();
    }
    
    this.saveShipInfo = function() {
        var name = view.getShipToNameInputValue();
        var address = view.getShipToAddressInput();
        var zip = view.getShipToZIPInputValue();
        var region = view.getShipToRegionInputValue();
        var country = view.getshipToCountryInputValue();

        var orderId = view.getIdFromArticle(),
            URL = 'http://localhost:3000/api/Orders/' + orderId,
            body = JSON.stringify({
                shipTo: {
                    name: name.value,
                    address: address.value,
                    ZIP: zip.value,
                    region: region.value,
                    country: country.value,
                }
            });
        
        view.vDisplaySpinnerTrue();
        model.saveSecondaryInfo(URL, body)
            .then(function() {
                view.vDisableShipEditForm()
            })
            .then(function() {
                return model.fetchOrderId(view.getIdFromArticle());
            })
            .then(function(result) {
                _initMap(result);
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }
    
    this.activateCustEdit = function() {
        view.vActivateCustomerEditForm();
    }
    
    this.saveCustomerInfo = function() {
        var id = view.getIdFromArticle(),
            URL = 'http://localhost:3000/api/Orders/' + id,
            body = JSON.stringify({
                customerInfo: {
                    firstName: view.getFirstNameInput(),
                    lastName: view.getLastNameInput(),
                    address: view.getAddressInput(),
                    phone: view.getPhoneInput(),
                    email: view.getEmailInput(),
                }
            });

        view.vDisplaySpinnerTrue();
        model.saveSecondaryInfo(URL, body)
            .then(function() {
                view.vDisableCustomerEditForm();
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
        
    }

    this._searchOrdersSidebar = function() {
        var input = view.getOrderInput();
        view.vClearOrderList();
        
        if (input.value != "") {
            view.vDisplaySpinnerTrue();
            model.fetchOrders("http://localhost:3000/api/Orders")
            .then(function(result) {
                var filteredProducts = result.filter(function (order) {
                    if((order.id).toString().indexOf(input.value.toUpperCase()) != -1) {
                        return true;
                    } else {
                        for (var key in order.summary) {
                            var  a = order.summary;
                            var  b = (a[key]).toString();
        
                            if (b.toUpperCase().indexOf(input.value.toUpperCase()) != -1) {
                                return true;
                            }
                        }
                    }
                    
                    return false;
                });


                if (filteredProducts === undefined || filteredProducts.length === 0 || result == 0) {
                    view.vNoOrderSearchResults();
                } else {
                    view.viewOrdersList(filteredProducts);
                }
    
            })
            .then(function(result) {
                view.giveActiveStyle();
            })
            .then(function() {
                _initShowDetailEvent();
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });

        } else {
            view.vClearOrderInput();
            
            view.vDisplaySpinnerTrue();
            model.fetchOrders("http://localhost:3000/api/Orders")
                .then(function(result) {
                    view.viewOrdersList(result);
                    view.giveActiveStyle();
                })
                .then(function () {
                    view.vDisplaySpinnerFalse();
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }

    this._refreshOrdersSidebar = function() {
        view.vClearOrderList();
        view.vClearOrderInput();

        view.vDisplaySpinnerTrue();
        model.fetchOrders("http://localhost:3000/api/Orders")
            .then(function(result) {
                view.viewOrdersList(result);
                view.giveActiveStyle();
                view.vClearOrderInput();
            })
            .then(function() {
                _initShowDetailEvent();
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });    
    }

    this._openModal = function(e) {
        var modal = document.querySelector('.modal');
        modal.style.display = 'block';
    }

    this._closeModal = function(){
        var modals = view.getModals();
        modals.forEach((function(modal) {
            modal.style.display = 'none';
        }));
    }


    this._sendOrder = function(e) {

        e.preventDefault();
        var created = new Date();
        var body = JSON.stringify({
            summary: {
                createdAt: '' + created.getFullYear() + '-' + (created.getMonth() + 1) + '-' + created.getDate(), 
                customer: view.getOrderCutomerInput().value,
                status: view.getOrderStatusInput().value,
                shippedAt: view.getOrderShippedInput().value,
                totalPrice: 0,
                currency: view.getOrderCurrencyInput().value
            },
            shipTo: { name: '', address: '', ZIP: '', region: '',country: '' },
            customerInfo: { firstName: '', lastName: '', address: '', phone: '', email: ''}
        });

        view.vDisplaySpinnerTrue();
        model.createEntity('http://localhost:3000/api/Orders', body)
            .then(function() {
                return model.fetchOrders("http://localhost:3000/api/Orders");
            })
            .then(function(result) {
                view.viewOrdersList(result);

                var orders = view.getOrdersList();
                for(var i = 0; i < orders.length; i++) {
                    (function(i) {
                        orders[i].addEventListener('click', that._onShowDetail);
                    })(i);
                }
                view.vClearOrdersInputs();
                var modals = view.getModals();
                modals.forEach((function(modal) {
                    modal.style.display = 'none';
                }))
            })
            .then(function() {
                view.giveActiveStyle();
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });

            
    }

    this._deleteOrderItem = function() {
        if (view.getOrderTitle() == null || view.getOrderTitle() == undefined || view.getOrderTitle() == '') {
            alert ('Choose any order');
        } else {
            view.vDisplaySpinnerTrue();
            model
                .deleteOrder("http://localhost:3000/api/Orders/" + view.getOrderTitle().textContent.split(' ')[1])
                .then(function() {
                    return model.fetchOrders("http://localhost:3000/api/Orders");
                })
                .then(function(result) {
                    view.viewOrdersList(result);
                    view.vClearOrderInput();
                    view.vWelcome();

                    var orders = view.getOrdersList();
                    for(var i = 0; i < orders.length; i++) {
                        (function(i) {
                            orders[i].addEventListener('click', that._onShowDetail);
                        })(i);
                    }
                })
                .then(function () {
                    view.vDisplaySpinnerFalse();
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }

    this._deleteProductItem = function (e) {
        var target = e.target;


        while (!target.getAttribute('data-itemId')) {
            target = target.parentNode;
        }

        view.vDisplaySpinnerTrue();
        model
            .deleteProduct('http://localhost:3000/api/OrderProducts/' + target.getAttribute('data-itemId'))
            .then(function () {
                return model.fetchProducts(view.getOrderTitle().textContent.split(' ')[1]);
            })
            .then(function(result) {
                view.vDrawTable(result);
                _initTableItemsExpirationsEvents();
                _initTableHeadSorting()
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    this._openProductModal = function() {
        view.vOpenProductModal();
    }

    this._sendProduct = function(e) {
        e.preventDefault();

        var body = JSON.stringify({
            name: view.getProductNameInput().value,
            price: view.getProductPriceInput().value,
            currency: view.getProductCurrencyInput().value,
            quantity: view.getProductQuantityInput().value,
            totalPrice: view.getProductPriceInput().value * view.getProductQuantityInput().value,
            orderId: view.getIdFromArticle()
        });

        view.vDisplaySpinnerTrue();
        model.createEntity('http://localhost:3000/api/OrderProducts', body)
            .then(function() {
                var id = view.getIdFromArticle();
                return model.fetchProducts(id);
            })
            .then(function(result) {
                view.vDrawTable(result);
            })
            .then(function() {
                _initTableItemsExpirationsEvents();
                _initTableHeadSorting();
            })
            .then(function() {
                view.vClearProductsInputs();
            })
            .then(function() {
                var modals = view.getModals();
                modals.forEach((function(modal) {
                    modal.style.display = 'none';
                }));
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    this._searchProducts = function(e) {
        var id = view.getIdFromArticle(),
        tr = view.getTR(),
        input = view.getProductSearchInput(),
        filtereItems = [],
        evtSortNum = '',
        dir = '';

        var thead = view.getTH();
        
            for (var t = 0; t < thead.length; t++) {
                if (thead[t].lastChild.classList.contains('fa-arrow-down')) {
                    dir = 'asc';
                    evtSortNum = t;
                } else if (thead[t].lastChild.classList.contains('fa-arrow-up')) {
                    dir = 'desc';
                    evtSortNum = t;
                }
            }
        
        
            for (var i = 0; i < tr.length; i++) {
                let td = tr[i].getElementsByTagName("td");
                for (var j = 0; j < td.length; j++) {
                    if (td[j]) {
                        if (td[j].innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                            filtereItems.push(+(td[0].innerHTML));
                        } 
                    } 
                }
            }

        view.vDisplaySpinnerTrue();
        model.fetchProducts(id)
            .then(function (result) {
                var arr = result.filter(function (item) {
                    if(filtereItems.includes(item.id)) {
                        return true;
                    }

                    return false;
                })

                return arr;
            })
            .then(function (result) {
                view.vDrawTable(result);
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .then(function () {
                _initTableItemsExpirationsEvents();
                _initTableHeadSorting()
            })
            .then(function () {
                sortTable(evtSortNum, dir)
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    this._refreshProductsSearch = function(e) {
        view.vClearProductInput();

        var id = view.getIdFromArticle();

        view.vDisplaySpinnerTrue();
        model.fetchProducts(id)
            .then(function(result) {
                view.vDrawTable(result);
            })
            .then(function () {
                view.vDisplaySpinnerFalse();
            })
            .then(function () {
                _initTableItemsExpirationsEvents();
                _initTableHeadSorting();
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    this._sortInit = function (e) {

        var target = e.target;
        var thead = view.getTH();

        while (target.hasAttribute("data-sort") == false) {
            target = target.parentNode;
        }
        
            if (target.lastChild.classList.contains('fa-arrow-down')) {
                sortTable(target.getAttribute("data-sort"), 'desc');
            } else if (target.lastChild.classList.contains('fa-arrow-up')) {
                sortTable(target.getAttribute("data-sort"), 'asc');
            } else {
                sortTable(target.getAttribute("data-sort"), 'desc');
            }
    }

    function sortTable (n, direction) {
        var table = view.getTable();
        var tbody = view.getTBody();
        var dir = typeof direction !== 'undefined' ?  direction : "asc";
        var rows = view.getTR();
        var arr = [];
        var arr2 = [];

        for(var i = 1; i < rows.length; i++) {
            
            arr2.push(rows[i].querySelectorAll("td")[n]);
        }

        if (dir == "asc") {
            rows[0].querySelectorAll('th').forEach(function(row) {
                row.lastChild.className = '';
                row.lastChild.classList.add('fas');
            });
            rows[0].querySelectorAll("th")[n].lastChild.classList.add('fa-arrow-down');
            arr2.sort(_compareAsc);
        } else if (dir == "desc") {
            rows[0].querySelectorAll('th').forEach(function(row) {
                row.lastChild.className = '';
                row.lastChild.classList.add('fas');
            });
            rows[0].querySelectorAll("th")[n].lastChild.classList.add('fa-arrow-up'); 

            arr2.sort(_compareDesc);  
        }

        for(var i = 0; i < arr2.length; i++) {
            rows.forEach(function(row) {
                if (row.querySelectorAll("td")[n] === arr2[i]) {
                    arr.push(row);
                }
            })
        }

        view.vSortTable(arr);
    }

    this._preventOrderCreate = function () {
        var modals = view.getModals();
            modals.forEach((function(modal) {
                modal.style.display = 'none';
            }));
            view.vClearOrdersInputs();
    }

    this._preventProductCreate = function () {
        var modals = view.getModals();
        modals.forEach((function(modal) {
            modal.style.display = 'none';
        }));
        view.vClearProductsInputs();
    }
}

(new Controller(new View, new Model)).initialize();