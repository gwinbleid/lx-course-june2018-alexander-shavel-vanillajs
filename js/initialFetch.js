window.onload = function () {
    // initial some events
    var sideBarSearch = document.querySelector('.order_search');
    sideBarSearch.addEventListener('click', searchOrdersSidebar);

    var sideBarRefresh = document.querySelector('.order_refresh');
    sideBarRefresh.addEventListener('click', refreshOrdersSidebar);

    //var input = document.querySelector('.order_search_input');
    //input.addEventListener('keyup', 'searchOrdersSidebar');

    

    init(Orders);
    
};

function init(Orders) {
    // get list of orders
    var orders = document.querySelector('.orders_list');
    // inner values
    Orders.forEach(order => {

        console.log(order.id);
        var order_item = document.createElement('div');
        order_item.setAttribute('class', 'orders_list_item');
        order_item.setAttribute('id', order.id);
        
        order_item.innerHTML = '<div class="orders_list_item_title"><div class="order_number">Order ' + order.id +
        '</div><div class="order_data">' + order.OrderInfo.createdAt + '</div></div>' +
        '<div class="orders_list_item_description"><div><span>' + order.OrderInfo.customer + 
        '</span><br><span>Shipped: ' + order.OrderInfo.shippedAt + '</span></div><div><span>' + order.OrderInfo.status + 
        '</span></div></div>';

        order_item.addEventListener('click', showDetail, false);

        orders.appendChild(order_item);
    });
}

function searchOrdersSidebar() {
    console.log('Initial');
    var orders = document.querySelector('.orders_list');
    orders.innerHTML = "";

    var input = document.querySelector('.order_search_input');
    console.log(input.value);
    
    if (input.value != "") {
        var filter = Orders.filter(function(order) {
            for (key in order.OrderInfo) {
                if (order.OrderInfo[key].toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                    return true;
                }
            }
    
            return false
        });
        init(filter);
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