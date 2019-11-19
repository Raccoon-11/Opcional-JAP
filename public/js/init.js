const CATEGORIES_URL = "http://localhost:3000/json/categorias";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/json/publish";
const CATEGORY_INFO_URL = "http://localhost:3000/json/categoInfo";
const PRODUCTS_URL = "http://localhost:3000/json/producto";
const PRODUCT_INFO_URL = "http://localhost:3000/json/productoInfo";
const CART_INFO_URL = "http://localhost:3000/json/carritoInfo";
const CART_BUY_URL = "http://localhost:3000/json/carritoBuy"


var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}