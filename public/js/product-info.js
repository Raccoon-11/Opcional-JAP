var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productCategoryHTML = document.getElementById("productCategory");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
            let productCriteriaHTML = document.getElementById("productSold");

            productNameHTML.innerHTML = product.prodInfo.name;
            productCategoryHTML.innerHTML = product.prodInfo.category;
            productDescriptionHTML.innerHTML = product.prodInfo.description;
            productCountHTML.innerHTML = product.prodInfo.cost + " " + product.prodInfo.currency;
            productCriteriaHTML.innerHTML = product.prodInfo.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.prodInfo.images);
        }
    });
});