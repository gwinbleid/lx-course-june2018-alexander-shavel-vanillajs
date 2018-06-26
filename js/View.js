function View() {
    /************
     * 
     * send querySelectors' result to controller
     * 
     */

    //Modals CancelButtons

    // get sidebar search button
    this.getSidebarSearch = function() {return document.querySelector('.order_search');}
    //get sidebar refresh button
    this.getSidebarRefresh = function() {return document.querySelector('.order_refresh');}
    // get delete Order Button
    this.getDeleteOrderButton = function () {return document.querySelector('.delete_order');}
    // get Add Order button 
    this.addOrderButton = function () {return document.querySelector('#orderCreateBtn');}
    // get close moduls button
    this.getClosebtn = function () {return document.querySelectorAll('.closeBtn');}
    // get create order button
    this.getOrderCreateButton = function () {return document.querySelector('#orderCreateForm');}
    // get product create modal
    this.getProductCreateForm = function () {return document.querySelector('#productCreateModal');}


    this.getMap = function() {return document.getElementById('google_map');}
    this.getCancelOrderAddingButton = function () { return document.querySelector('#cancelOrderAdding');}
    this.getCancelProductAddingButton = function () { return document.querySelector('#cancelProductAdding');}

    this.getTH = function() {return document.querySelectorAll('th');}
    this.getTR = function() {return document.querySelectorAll('tr');}

    this.getIdFromArticle = function () {return document.querySelector('.order_title').textContent.split(' ')[1]}

    this.getOrderSidebar = function () {return document.querySelector('.orders_list');}

    this.getArticle = function() {return document.querySelector('article');}

    this.getOrdersList = function() {return document.querySelectorAll('.orders_list_item');}

    this.getTable = function() {return document.querySelector('table');}

    this.getTBody = function() {return document.querySelector('tbody');}

    this.getTHead = function() {return document.querySelector('thead');}

    this.getButtonClass = function() {return document.querySelectorAll('.button');}

    this.getOrderInput = function() {return document.querySelector('.order_search_input');}

    this.getModals = function() {
        return document.querySelectorAll('.modal');
    }

    this.getOrderTitle = function() {
        return document.querySelector('.order_title');
    }

    this.getAddProductButton = function() {
        return document.querySelector('.add_product_button');
    }

    // Get Product Search Input
    this.getProductSearchInput = function () {
        return document.querySelector('.product_search_input')
    }

    // ************GET SECONDARY INFO BUTTONS***********/
    this.getEditShipButton = function() {return document.querySelector('#edit_ship_data');}
    this.getEditCustButton = function() {return document.querySelector('#edit_customer_data');}
    this.getSaveShipData = function() {return document.querySelector('#save_ship_data');}
    this.getSaveCustData = function() {return document.querySelector('#save_customer_data')}


    /**   Get Order Creating Input      */
    this.getOrderCutomerInput = function() { return document.querySelector('#order_customer_input');}
    this.getOrderStatusInput = function() {return document.querySelector('#order_status_input');}
    this.getOrderShippedInput = function() {return document.querySelector('#order_shipped_input');}
    this.getOrderCurrencyInput = function() {return document.querySelector('#order_currency_input');}

    /**    Get Order Creating Input      */
    this.getProductNameInput = function () {return document.querySelector('#product_name_input');}
    this.getProductPriceInput = function() {return document.querySelector('#product_price_input');}
    this.getProductQuantityInput = function() {return document.querySelector('#product_quantity_input');}
    this.getProductCurrencyInput = function() {return document.querySelector('#product_currency_input');}

    /** Get Product search buttons */
    this.getSearchProductButton = function () {return document.querySelector('.product_search');}
    this.getRefreshProductButton = function () {return document.querySelector('.product_refresh');}

    // Get Expiration Buttons
    this.getExpirationButtons = function () {return document.querySelectorAll('.delete_item');}

    // Gets ship info inputs values
    this.getShipToNameInputValue = function () {return document.querySelector('#ship_inputs_name');}
    this.getShipToAddressInput = function () {return document.querySelector('#ship_inputs_address');}
    this.getShipToZIPInputValue = function () {return document.querySelector('#ship_inputs_zip');}
    this.getShipToRegionInputValue = function () {return document.querySelector('#ship_inputs_region');}
    this.getshipToCountryInputValue = function () {return document.querySelector('#ship_inputs_country');}

    // Gets customer info inputs
    this.getFirstNameInput = function () {return document.querySelector('#customer_firstName').value;}
    this.getLastNameInput = function () { return document.querySelector('#customer_lastName').value;}
    this.getAddressInput = function () {return document.querySelector('#customer_address').value;}
    this.getPhoneInput = function() { return document.querySelector('#customer_phone').value;}
    this.getEmailInput = function () {return document.querySelector('#customer_email').value};

    /***********************
     * 
     * 
     * Secondary functions
     * 
    */

    this.vDisplaySpinnerTrue = function () {return document.querySelector('.loader').style.display = 'block';}
    this.vDisplaySpinnerFalse = function () {return document.querySelector('.loader').style.display = 'none';}


    this.vClearArticle = function() {var _sArticle = this.getArticle(); return _sArticle.innerHTML = '';}

    this.vClearOrderList = function() {var _sOrdersList = this.getOrderSidebar(); return _sOrdersList.innerHTML = '';}

    this.vClearOrderInput = function() {var _sOrderInput = this.getOrderInput(); return _sOrderInput.value = '';}
    this.vClearProductInput = function () {return document.querySelector('.product_search_input').value = '';}

    this.vWelcome = function() {
        this.vClearArticle();
        var _sWelcome = this.getArticle();
        _sWelcome.innerHTML = "<div class='welcome text_align_center'>" +
            "<h1 class='hello'>Hello</h1>" +
            "<h1>Welcome to order's manager app</h1>" + 
        "</div>";
    }


    this.vNoOrderSearchResults = function () {this.vClearOrderList(); var _OrderMessage = this.getOrderSidebar(); return _OrderMessage.innerHTML = '<h4 style="text-align: center;">No Result</h4>';}
    this.vClearOrdersInputs = function () {
        var getOrderCutomerInput = this.getOrderCutomerInput(),
            getOrderStatusInput = this.getOrderStatusInput(),
            getOrderShippedInput = this.getOrderShippedInput(),
            getOrderCurrencyInput = this.getOrderCurrencyInput();

            getOrderCutomerInput.value = '';
            getOrderStatusInput.value = 'Pending';
            getOrderShippedInput.value = '';
            getOrderCurrencyInput.value = 'EUR';
    }

    this.vClearProductsInputs = function () {
        var getProductNameInput = this.getProductNameInput(),
            getProductPriceInput = this.getProductPriceInput(),
            getProductQuantityInput = this.getProductQuantityInput(),
            getProductCurrencyInput = this.getProductCurrencyInput();

            getProductNameInput.value = '';
            getProductPriceInput.value = '';
            getProductQuantityInput.value = '';
            getProductCurrencyInput.value = 'EUR';
    }

    // Open Product Modal
    this.vOpenProductModal = function() {
        var modal = document.querySelector('#productCreateModal');
        modal.style.display = 'block';
    }


    // Activer Customer Edit Inputs
    this.vActivateCustomerEditForm = function () {
        document.querySelector('#edit_customer_data').classList.add('hiding');
        document.querySelector('#save_customer_data').classList.remove('hiding');
        document.querySelectorAll('.customer_inputs').forEach(input => {
            input.disabled = false;
        })
    }

    // Disable Customer Edit Inpusts
    this.vDisableCustomerEditForm = function () {
        document.querySelector('#edit_customer_data').classList.remove('hiding');
        document.querySelector('#save_customer_data').classList.add('hiding');
        document.querySelectorAll('.customer_inputs').forEach(input => {
            input.disabled = true;
        })
    }

    // Activate form for ship editing
    this.vActivateShipEditForm = function () {
        document.querySelector('#edit_ship_data').classList.add('hiding');
        document.querySelector('#save_ship_data').classList.remove('hiding');
        document.querySelectorAll('.ship_inputs').forEach(input => {
            input.disabled = false;
        })
    }

    this.vDisableShipEditForm = function () {
        document.querySelector('#edit_ship_data').classList.remove('hiding');
        document.querySelector('#save_ship_data').classList.add('hiding');
        document.querySelectorAll('.ship_inputs').forEach(input => {
            input.disabled = true;
        })
    }

    /************* MAIN PART */
    this.viewOrdersList = function(data) {
        // get list of orders
        var orders = document.querySelector('.orders_list'),
            title = document.querySelector('#entity_name');

        orders.innerHTML = '';
        title.innerHTML = 'Orders (' + data.length + ')';
        // inner values
        data.forEach(order => {
            var order_item = document.createElement('div');
            order_item.setAttribute('class', 'orders_list_item');
            order_item.setAttribute('id', order.id);
    
            order_item.innerHTML = '<div class="orders_list_item_title"><div class="order_number">Order ' + order.id +
            '</div><div class="order_data">' + order.summary.createdAt + '</div></div>' +
            '<div class="orders_list_item_description"><div><span>' + order.summary.customer + 
            '</span><br><span>Shipped: ' + order.summary.shippedAt + '</span></div><div><span>' + order.summary.status + 
            '</span></div></div>';

            orders.appendChild(order_item);
        });
    }

    this.giveActiveStyle = function() {
        var orders = document.querySelectorAll('.orders_list_item');
        var aFilter = [];
        if(document.querySelector('.order_title') !== null) {
            orders.forEach(function(order) {
                if (order.id == document.querySelector('.order_title').textContent.split(' ')[1]) {
                    aFilter.push(order)
                }
                if (aFilter.length === 0) {
                    orders.forEach(function(order) {
                        order.classList.remove('active_list_item');
                    });
                } else {
                    orders.forEach(function(order) {
                        order.classList.remove('active_list_item');
                    });
                    aFilter[0].classList.add('active_list_item');
                }
            });
        } else {
            orders.forEach(function(order) {
                order.classList.remove('active_list_item');
            });
        }
    }

    // Add in detail class order information
    this.vShowOrderInfo = function(order) {
        var article = document.querySelector('article');
        var section = document.createElement('section');
        section.setAttribute('class', 'order_info');
    
        var order_info = document.createElement("div");
        order_info.setAttribute('id', order.id);
        section.innerHTML = '<div class="title"><div><span class="order_title">Order ' + order.id + '</span></div>'+
            '<div><span class="total_item_cost">' + order.summary.totalPrice + '</span><br><span>' + order.summary.currency +'</span></div></div>' + 
            '<div class="order_info_data"><span>Customer: ' + order.summary.customer + '</span><br>' +
            '<span>Ordered: ' + order.summary.createdAt + '<br></span><span>Shipped: ' + order.summary.shippedAt + '</span><br>'+
            '<span>Status: ' + order.summary.status + '</span></div>'+
            '<div class="info_panel">' +
                '<div id="ship_button" class="info_item active_info">' +
                    '<div class="button shipping_data">' + 
                        '<i class="fas fa-truck"></i>' + 
                    '</div>' + 
                '</div>' + 
                '<div id="customer_button" class="info_item">' + 
                    '<div class="button customer_data">' +
                        '<i class="fas fa-user-tie"></i>' +
                    '</div>' + 
                '</div>' + 
                '<div id="mapping_button" class="info_item">' + 
                    '<div class="button mapping_data">' +
                        '<i class="far fa-map"></i>' +
                    '</div>' + 
                '</div>'
            '</div>';
    
        article.appendChild(section);
    }

    // add section with info about shipping and cusotmer
    this.vShowOrderSecondaryInfo = function(order) {
        var article = document.querySelector('article');
        var section = document.createElement('section');
        var body = document.querySelector('body');
        var script = document.createElement('script');
        script.innerHTML = '';
        section.setAttribute('class', 'secondary_info');
    
        var shipData = document.createElement('div');
        shipData.setAttribute('id', 'shipping_data');
        shipData.innerHTML = '' + 
            '<h3 class="section_heading">Shipping address ' + 
                '<button class="secondary_info_button" id="edit_ship_data">' + 
                    '<i class="far fa-edit"></i>' + 
                '</button>' +
                '<button class="secondary_info_button hiding" id="save_ship_data">' + 
                    '<i class="far fa-save"></i>' + 
                '</button>' + 
            '</h3><hr>' + 
            '<div class="secondary_body">' + 
                '<div class="secondary_wrapper">' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>Name: </span>' + 
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="ship_inputs_name" class="ship_inputs secondary_info_inputs" value="' + order.shipTo.name + '" disabled>' + 
                        '</div>' +
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>Address: </span>' + 
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="ship_inputs_address" class="ship_inputs secondary_info_inputs" value="' + order.shipTo.address + '" disabled>' + 
                        '</div>' +
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>ZIP Code: </span>' +
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="ship_inputs_zip" class="ship_inputs secondary_info_inputs" value="' + order.shipTo.ZIP + '" disabled>' +
                        '</div>' +
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>Region: </span>' +
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="ship_inputs_region" class="ship_inputs secondary_info_inputs" value="' + order.shipTo.region + '" disabled>' +
                        '</div>' +
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>Country: </span>' + 
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="ship_inputs_country" class="ship_inputs secondary_info_inputs" value="' + order.shipTo.country + '" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            '</div>';
    
        var customerData = document.createElement('div');
        customerData.setAttribute('id', 'customer_data');
        customerData.setAttribute('class', 'hiding');
        customerData.innerHTML = '' + 
            '<h3 class="section_heading">' +
                'Client Information '+
                '<button class="secondary_info_button" id="edit_customer_data">' +
                    '<i class="far fa-edit"></i>' +
                '</button> ' + 
                '<button class="secondary_info_button hiding" id="save_customer_data">' + 
                    '<i class="far fa-save"></i>' +
                '</button>' +
            '</h3><hr>' +
            '<div class="secondary_body">' +
                '<div class="secondary_wrapper">' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' +
                            '<span>Name: </span>' +
                        '</div>' +
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="customer_firstName" class="customer_inputs secondary_info_inputs" value="' + order.customerInfo.firstName + '" disabled>' +
                        '</div>' +
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' + 
                            '<span>Surname: </span>' + 
                        '</div>' + 
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="customer_lastName" class="customer_inputs secondary_info_inputs" value="' + order.customerInfo.lastName + '" disabled>' +
                        '</div>' + 
                    '</div>' + 
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' + 
                            '<span>Street: </span>' + 
                        '</div>' + 
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="customer_address" class="customer_inputs secondary_info_inputs" value = "' + order.customerInfo.address + '" disabled>' +
                        '</div>' + 
                    '</div>' +
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' + 
                            '<span class="">Phone: </span>' + 
                        '</div>' + 
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="customer_phone" class="customer_inputs secondary_info_inputs" value="' + order.customerInfo.phone + '" disabled>' +
                        '</div>' +
                    '</div>' + 
                    '<div class="secondary_info_item">' + 
                        '<div class="text_align_right secondary_info_title">' + 
                            '<span>E-mail </span>' + 
                        '</div>' + 
                        '<div class="text_align_left secondary_info_input">' + 
                            '<input id="customer_email" class="customer_inputs secondary_info_inputs" value="' + order.customerInfo.email + '" disabled>'
                        '</div>' +
                    '</div>' + 
                '</div>' + 
            '</div>';
        
        var mapData = document.createElement('div');
        mapData.setAttribute('id', 'mapping_data');
        mapData.setAttribute('class', 'hiding');
        mapData.innerHTML = '<h3 class="section_heading">Shipping address </h3><hr>' + 
            '<div class="secondary_body">' + 
                '<div id="google_map"></div>' +
            '</div>';
    
        section.appendChild(shipData);
        section.appendChild(customerData);
        section.appendChild(mapData);
    
        article.appendChild(section);
    }

    this.vShowTableOfProducts = function(order) {
        var article = document.querySelector('article'),
            section = document.createElement('section'),
            tableData = "";
    
        section.setAttribute('class', 'items_info');
        section.innerHTML = '<h3 class="section_heading">Products</h3><hr>' +
            '<div class="product_search_section">' +
                '<div class="product_form_input">' +
                    '<input class="product_search_input" type="text" placeholder="Search here..." required>' +
                    '<div class="form_buttons">' +
                        '<button type="submit" class="product_button product_search"><i class="fas fa-search"></i></button>' + 
                        '<button class="product_button product_refresh"><i class="fas fa-sync-alt"></i></button>' + 
                    '</div>' +      
                '</div>' +
                '<div>' +
                 '<button class="add_product_button"><i class="fas fa-plus"></i></button>' + 
                '</div>' +
            '</div>' + 
            '<div class="table"></div>';
        
        article.appendChild(section);
    }

    this.vDrawTable = function(data, dir, sort) {
        var searchResult;
        var div = document.querySelector('.table'),
            span = document.createElement('span');
            table = document.createElement('table');
        
        var tableData = '';
    
            div.innerHTML = '';
            table.innerHTML='';
        
        data.forEach(item => {
            tableData += '<tr><td data-type="num" class="text_align_left">' + item.id + '</td>' +
                    '<td data-type="str" class="text_align_center">' + item.name + '</td>' +
                    '<td data-type="num" class="text_align_center">' + item.price  + ' ' + item.currency + '</td>' +
                    '<td data-type="num" class="text_align_center">' + item.quantity +'</td>' +
                    '<td data-type="num" class="text_align_center">' + item.totalPrice + ' ' + item.currency + '</td>' +
                    '<td class="text_align_center">' +
                        '<button data-itemId="' + item.id + '" class="delete_item">'+
                            '<i class="far fa-trash-alt"></i>' +
                        '</button>'
                    '</td>' +
                '</tr>';
            });
            
        
        if (data == undefined || data == '' || data == null) {
            span.innerHTML = '<h4>No Items</h4>';
    
            div.appendChild(span);
        } else {
            table.innerHTML = 
            '<thead>' +
                '<th data-sort="0">ID <i class="fas"></i></th>' +
                '<th data-sort="1">Product <i class="fas"></i></th>' + 
                '<th data-sort="2">Unit Price <i class="fas"></i></th>' +
                '<th data-sort="3">Quantity <i class="fas"></i></th>' + 
                '<th data-sort="4">Total <i class="fas"></i></th>' +
                '<th><i class="fas"></th>' + 
            '</thead>' + 
            '<tbody>' + tableData + '</tbody>';
    
            div.appendChild(table);
        }
    }

    this.vSortTable = function(data) {
        var table = this.getTable();
        var tbody = this.getTBody();

        data.forEach(item => {
            tbody.appendChild(item);
        })
    
        table.appendChild(tbody);
    }

    this.vGeocodeAddress = function(geocoder, resultsMap, data) {
        var map = this.getMap();
        var address = '' + data.shipTo.country + ', ' + data.shipTo.region + ', ' + data.shipTo.address;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
            } else {
                map.innerHTML = '<h4>Geocode was not successful</h4>';
            }
        })
    }

    this.vSwitchtoShipData = function () {
        var ship = document.querySelector('#shipping_data');
        var customer = document.querySelector('#customer_data');
        var map = document.querySelector('#mapping_data');
    
        var customer_button = document.querySelector('#customer_button');
        var ship_button = document.querySelector('#ship_button');
        var map_button = document.querySelector('#mapping_button');

        map.classList.add('hiding')
        customer.classList.add('hiding');
        ship.classList.remove('hiding');

        customer_button.classList.remove('active_info');
        map_button.classList.remove('active_info');
        ship_button.classList.add('active_info');
    }

    this.vSwitchtoCustomerData = function () {
        var ship = document.querySelector('#shipping_data');
        var customer = document.querySelector('#customer_data');
        var map = document.querySelector('#mapping_data');
    
        var customer_button = document.querySelector('#customer_button');
        var ship_button = document.querySelector('#ship_button');
        var map_button = document.querySelector('#mapping_button');

        customer.classList.remove('hiding');
        ship.classList.add('hiding');
        map.classList.add('hiding');

        customer_button.classList.add('active_info');
        ship_button.classList.remove('active_info');
        map_button.classList.remove('active_info');
    }

    this.vSwitchtoMapData = function () {
        var ship = document.querySelector('#shipping_data');
        var customer = document.querySelector('#customer_data');
        var map = document.querySelector('#mapping_data');
    
        var customer_button = document.querySelector('#customer_button');
        var ship_button = document.querySelector('#ship_button');
        var map_button = document.querySelector('#mapping_button');

        map.classList.remove('hiding');
        ship.classList.add('hiding');
        customer.classList.add('hiding');

        customer_button.classList.remove('active_info');
        ship_button.classList.remove('active_info');
        map_button.classList.add('active_info');
    }

    
}