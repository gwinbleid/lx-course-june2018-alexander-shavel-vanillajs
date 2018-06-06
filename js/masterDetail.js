function showDetail(evt) {
    var orders = document.querySelectorAll('.orders_list_item');
    orders.forEach(function(order) {
        order.classList.remove('active_list_item');
    })
    var target = evt.target;
    
        while (target.className != 'orders_list_item') {
            target = target.parentNode;
        }

        target.classList.add('active_list_item');
        showOrderData(orderSearch(target.id));
};

function orderSearch(id) {
    var order = Orders.filter(function (order) {
        if (order.id === id) {
            return true;
        }
        return false;

    });

    return order[0];
}

function showOrderData(item) {
    var article = document.querySelector('article');
    article.innerHTML = '';
    showOrderInfo(item);
    showOrderSecondaryInfo(item); 
    showTableOfProducts(item);   
}

function showOrderInfo(order) {
    var article = document.querySelector('article');
    var section = document.createElement('section');
    section.setAttribute('class', 'order_info');

    var order_info = document.createElement("div");
    order_info.setAttribute('id', order.id);
    section.innerHTML = '<div class="title"><div><span class="order_title">Order ' + order.id + '</div>'+
        '<div><span class="total_item_cost">150 935,13</span><br><span>EUR</span></div></div>' + 
        '<div class="order_info_data"><span>Customer: ' + order.OrderInfo.customer + '</span><br>' +
        '<span>Ordered: ' + order.OrderInfo.createdAt + '<br></span><span>Shipped: ' + order.OrderInfo.shippedAt + '</span><br>'+
        '<span>Status: ' + order.OrderInfo.status + '</span></div>'+
        '<div class="info_panel"><div id="ship_button" class="info_item active_info"><div class="button shipping_data"><i class="fas fa-truck"></i></div></div><div id="customer_button" class="info_item"><div class="button customer_data"><i class="fas fa-user-tie"></i></div></div></div>';

    article.appendChild(section);

    var button = document.querySelectorAll('.button');
    console.log(button);

    for(var i = 0; i < button.length; i++) {
        (function(i) {
            button[i].addEventListener('click', switchOrderInfo);
        })(i);
    }
    //('.button').addEventListener('click', switchOrderInfo);
}

function showOrderSecondaryInfo(order) {
    var article = document.querySelector('article');

    var section = document.createElement('section');
    section.setAttribute('class', 'secondary_info');

    var shipData = document.createElement('div');
    shipData.setAttribute('id', 'shipping_data');
    shipData.innerHTML = '<h3 class="section_heading">Shipping address</h3><hr><div class="secondary_body"><div class"text_align_left"> '+
        '<span>Street: </span><br><span>Address: </span><br><span>ZIP Code: </span><br><span>Region: </span><br><span>Country: </span></div>' +
        '<div class="text_align_left"><span>' + order.ShipTo.name + '</span><br><span>' + order.ShipTo.Address +'</span><br><span>' + order.ShipTo.ZIP +'</span><br><span>' + order.ShipTo.Region +
        '</span><br><span>' + order.ShipTo.Country +'</span></div></div>';
        

    var customerData = document.createElement('div');
    customerData.setAttribute('id', 'customer_data');
    customerData.setAttribute('class', 'hiding');
    customerData.innerHTML = '<h3 class="section_heading">Client Information</h3><hr><div class="secondary_body"><div class"text_align_left"> '+
        '<span>Name: </span><br><span>Surname: </span><br><span>Street: </span><br><span>Phone: </span><br><span>E-mail </span></div>' +
        '<div class="text_align_left"><span>' + order.CustomerInfo.firstName + '</span><br><span>' + order.CustomerInfo.lastName +'</span><br><span>' + order.CustomerInfo.address +'</span><br><span>' + order.CustomerInfo.phone +
        '</span><br><span>' + order.CustomerInfo.email  +'</span></div></div>';
    
    section.appendChild(shipData);
    section.appendChild(customerData);

    article.appendChild(section);
}

function showTableOfProducts(order) {
    var article = document.querySelector('article');

    var section = document.createElement('section');
    section.setAttribute('class', 'items_info');

    var tableData = "";

    order.products.forEach(item => {
        tableData += '<tr><td class="text_align_left">' + item.id + '</td><td class="text_align_center">' + item.name + '</td><td class="text_align_center">' + item.price  +
        ' ' + item.currency + '</td><td class="text_align_center">' + item.quantity +
        '</td><td class="text_align_right">' + item.totalPrice + ' ' + item.currency + '</td></tr>';
    })


    section.innerHTML = '<h3 class="section_heading">Products</h3><hr><div class="product_search_section"><input class="product_search_input" type="text" placeholder="Search here..." required>' +
        '<div class="form_buttons"><button type="submit" class="product_button product_search"><i class="fas fa-search"></i></button><button class="product_button product_refresh"><i class="fas fa-sync-alt"></i></button></div></div>' +
        '<table><thead><thead><th>ID <i class="fas"></i></th><th>Product <i class="fas"></i></th><th>Unit Price <i class="fas"></i></th><th>Quantity <i class="fas"></i></th><th>Total <i class="fas"></i></th></thead><tbody>' + tableData + '</tbody></table>' 
    
    article.appendChild(section);
    var searchButton = document.querySelector('.product_search');
    var refreshButton = document.querySelector('.product_refresh');
    var th = document.querySelectorAll('th');

    searchButton.addEventListener('click', searchProducts);
    refreshButton.addEventListener('click', refreshProducts);
    
    for(var i = 0; i < th.length; i++) {
        (function(i) {
            th[i].addEventListener('click', thSwitchOrder);
        })(i);
    }
}

function searchOrdersSidebar() {
    var orders = document.querySelector('.orders_list');
    orders.innerHTML = "";

    var input = document.querySelector('.order_search_input');
    console.log(input.value);
    
    if (input.value != "") {
        var filter = Orders.filter(function(order) {
            for (key in order.OrderInfo) {
                if (order.OrderInfo[key].toUpperCase().indexOf(input.value.toUpperCase()) !== -1) {
                    return true;
                }
            }
    
            return false
        });

        if (filter === undefined || filter.length === 0 || filter == 0) {
            orders.innerHTML = '<h3 class="text_align_center">No Results</h3>';
        } else {
            init(filter);
        }
    } else {
        refreshOrdersSidebar();
    }
}

function refreshOrdersSidebar() {
    var orders = document.querySelector('.orders_list');
    orders.innerHTML = "";

    var input = document.querySelector('.order_search_input');
    input.value = '';
    init(Orders);
}

function thSwitchOrder(e) {
    var th = document.querySelectorAll('th');
    
        for (var k = 0; k < th.length; k++) {
            if (th[k].lastChild.classList.contains('fa-arrow-up') || th[k].lastChild.classList.contains('fa-arrow-up')) {
                th[k].lastChild.className = "";
                console.log(th[k].lastChild.className = "");
                th[k].lastChild.classList.add('fas');
            }
        }

    var target = e.target;
    if (target.lastChild.classList.contains('fa-arrow-up')) {
        console.log('no');
        target.lastChild.classList.remove('fa-arrow-up');
        target.lastChild.classList.add('fa-arrow-down');

    } else if (target.lastChild.classList.contains('fa-arrow-down')) {
        target.lastChild.classList.remove('fa-arrow-down');
        target.lastChild.classList.add('fa-arrow-up');
    }
        var input = document.querySelector('.product_search_input');
        var tbody = document.querySelector('tbody');
    
    //tbody.innerHTML = "";
}

function tableSort(evt) {

}

function searchProducts(evt) {
    var table = document.querySelector('table');
    var input = document.querySelector('.product_search_input');
    var id = document.querySelector('.order_title').textContent.split(' ')[1];
    var filterOrder = Orders.filter(function(order) {
        if (order.id == id) {
            return true;
        }
    });

    console.log(filterOrder);

    var filteredProducts = filterOrder[0].products.filter(function (product) {
        for (var key in product) {
            if (product[key].toUpperCase().indexOf(input.value.toUpperCase()) != -1) {
                return true;
            }
        }
        return false;
    });

    if (filteredProducts === undefined || filteredProducts == 0) {
        table.innerHTML = '<h3>No Results</h3>';
    } else {
        showFilteredProducts(filteredProducts);
    }
}

function refreshProducts() {
    var table = document.querySelector('table');
    var id = document.querySelector('.order_title').textContent.split(' ')[1];
    var data = Orders.filter(function(order) {
        if (order.id == id) {
            return true;
        }
    });
    var arr = data[0].products;
    var body = '';
    arr.forEach(function(item) {
        console.log(item);
        body += '<tr><td class="text_align_left">' + item.id + '</td><td class="text_align_center">' + item.name + '</td><td class="text_align_center">' + item.price  +
        ' ' + item.currency + '</td><td class="text_align_center">' + item.quantity +
        '</td><td class="text_align_right">' + item.totalPrice + ' ' + item.currency + '</td></tr>';
    })

    table.innerHTML = '<thead><thead><th>ID <i class="fas"></i></th><th>Product <i class="fas"></i></th><th>Unit Price <i class="fas"></i></th><th>Quantity <i class="fas"></i></th><th>Total <i class="fas"></i></th></thead><tbody>' + body + '</tbody>';
}

function showFilteredProducts(data) {
    var tbody = document.querySelector('tbody');
    
    var body = '';
    data.forEach(function(item) {
        body += '<tr><td class="text_align_left">' + item.id + '</td><td class="text_align_center">' + item.name + '</td><td class="text_align_center">' + item.price  +
        ' ' + item.currency + '</td><td class="text_align_center">' + item.quantity +
        '</td><td class="text_align_right">' + item.totalPrice + ' ' + item.currency + '</td></tr>';
    })
    tbody.innerHTML = '';
    tbody.innerHTML = body;
}

function switchOrderInfo(e) {
    var target = e.target;
    var ship = document.querySelector('#shipping_data');
    var customer = document.querySelector('#customer_data');

    var customer_button = document.querySelector('#customer_button');
    var ship_button = document.querySelector('#ship_button');

    console.log(customer.parentNode.classList);

    while (!target.classList.contains('button')) {
        target = target.parentNode;
    }

    if(target.classList.contains('shipping_data')) {
        customer.classList.add('hiding');
        ship.classList.remove('hiding');

        customer_button.classList.remove('active_info');
        ship_button.classList.add('active_info');
    } else if(target.classList.contains('customer_data')) {
        customer.classList.remove('hiding');
        ship.classList.add('hiding');

        customer_button.classList.add('active_info');
        ship_button.classList.remove('active_info');
    }
}

function addClass (element, className) {
    element.addClass(className);
}

function removeClass (element, className) {
    element.removeClass(className);
}