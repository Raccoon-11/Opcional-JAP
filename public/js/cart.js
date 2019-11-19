let productUnitCost = 0;
let productCurrency = "UYU ";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let productCount = 0;
var formaDePago = "";

let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";



var articulo = {
    precio: 0,
    cantidad: 0
};

function agregarPreCant(precio, cantidad) {
    articulo.precio = parseInt(precio);
    articulo.cantidad = parseInt(cantidad);
    productCount = cantidad;
    productUnitCost = precio;
}







//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {

    let productUnitCosttHTML = document.getElementById("productCostText");
    let cantidadOfProductHTML = document.getElementById("cantidad");
    let subtotalCost = document.getElementById("subtotal");
    let shippComisionHTML = document.getElementById("shippText");
    let totalCostHTML = document.getElementById("totalCostText");



    let unitCostToShow = productCurrency + articulo.precio;
    let cantidadToMostrar = document.getElementById("cantidadIngresada").value;
    let subtotalMostrar = productCurrency + productUnitCost * document.getElementById("cantidadIngresada").value;
    let shippingCostMostrar = productCurrency + (Math.round(productUnitCost * productCount * shippingPercentage * 100) / 100);
    let totalCostMostrar = productCurrency + ((Math.round(productUnitCost * productCount * shippingPercentage * 100) / 100) + productUnitCost * productCount);





    productUnitCosttHTML.innerHTML = unitCostToShow;
    cantidadOfProductHTML.innerHTML = cantidadToMostrar;
    subtotalCost.innerHTML = subtotalMostrar;
    shippComisionHTML.innerHTML = shippingCostMostrar;
    totalCostHTML.innerHTML = totalCostMostrar;



}





function BloquearAndDesbloquear() {




}



function showArticles(parametr) {
    let articulo = "";


    for (let i = 0; i < parametr.cartInfo.articles.length; i++) {
        let products = parametr.cartInfo.articles[i];

        productCount = products.count

        articulo +=


            ` <div class="col-md-4">
                        
                            <div class="card mb-4 shadow-sm">
                            <img class="bd-placeholder-img card-img-top" width="50%" height="200" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail" src="` + products.src + `">
                                <div class="card-body">
                                    <h1> ` + products.name + ` </h1>
                                    <p class="card-text">  precio del artículo ` + products.currency + " " + products.unitCost + ` </p>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="productCountInput">Cantidad</label>
                                            <input style="width: 200%;" type="number" class="form-control" id="cantidadIngresada" placeholder="" required="" value="` + productCount + `" min="0">
                                            <p id="cantidadError" class="textoRojo"></p>
                                            <div class="invalid-feedback" >
                                                La cantidad es requerida.
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                          
                        
                    </div> `

        document.getElementById("articulo").innerHTML = articulo;

    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showArticles(resultObj.data);
            var artic = resultObj.data;

            agregarPreCant(artic.cartInfo.articles[0].unitCost, artic.cartInfo.articles[0].count);

            document.getElementById("cantidadIngresada").addEventListener("change", function() {
                productCount = this.value;
                document.getElementById("cantidadIngresada").value = this.value;
                updateTotalCosts();
            });

            updateTotalCosts();
            $(document).ready(function() {

                $("#cantidadIngresada").blur(function() {
                    if (isNaN(this.value)) {
                        document.getElementById("cantidadError").innerHTML = "Solo se admiten caracteres numericos";

                    } else if (this.value <= 0) {

                        document.getElementById("cantidadError").innerHTML = "La cantidad tiene que ser mayor a cero";
                    } else {

                        document.getElementById("cantidadError").innerHTML = "";
                    }
                });

            });
        }
    });




    document.getElementById("premium").addEventListener("change", function() {
        shippingPercentage = 0.15;
        updateTotalCosts();
    });

    document.getElementById("express").addEventListener("change", function() {
        shippingPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standard").addEventListener("change", function() {
        shippingPercentage = 0.05;
        updateTotalCosts();
    });

});

//controles para prevenir que el usuario/a no ingrese datos incorrectos






document.addEventListener("DOMContentLoaded", function(e) {

    $(document).ready(function() {



        $("#departamento").blur(function() {
            if (!isNaN(this.value)) {
                document.getElementById("depa").innerHTML = "No se admiten números ni campos vacíos";

            } else {

                document.getElementById("depa").innerHTML = "";
            }
        });

        $("#calle").blur(function() {
            if (!isNaN(this.value)) {
                document.getElementById("street").innerHTML = "No se admiten números ni campos vacíos";

            } else {

                document.getElementById("street").innerHTML = "";
            }
        });

        $("#numero").blur(function() {
            if (isNaN(this.value)) {
                document.getElementById("number").innerHTML = "Solo se admiten caracteres numéricos";

            } else if (this.value <= 0) {

                document.getElementById("number").innerHTML = "Ingrese un número mayor a cero";
            } else {

                document.getElementById("number").innerHTML = "";
            }
        });

        $("#esquina").blur(function() {
            if (!isNaN(this.value)) {
                document.getElementById("esq").innerHTML = "Calle invalida";

            } else {

                document.getElementById("esq").innerHTML = "";
            }
        });




        $("#creditCardNumber").blur(function() {



            if (isNaN(this.value)) {
                document.getElementById("tarjeta").innerHTML = "Solo se admiten caracteres numéricos";

            } else if (this.value.length !== 16) {

                document.getElementById("tarjeta").innerHTML = "La cantidad de caracteres no es valida";
            } else {

                document.getElementById("tarjeta").innerHTML = "";
            }
        });

        $("#creditCardSecurityCode").blur(function() {
            if (isNaN(this.value)) {
                document.getElementById("codigoSeg").innerHTML = "Solo se admiten caracteres numéricos";

            } else if (this.value.length !== 3) {

                document.getElementById("codigoSeg").innerHTML = "Cantidad de caracteres no valido";
            } else {

                document.getElementById("codigoSeg").innerHTML = "";
            }
        });

        $("#dueDate").blur(function() {

            let fechaActual = new Date();
            let mesAct = (fechaActual.getMonth() + 1);
            let añoAct = fechaActual.getFullYear();

            let fechaIngresada = this.value;
            let añoIng = parseInt(this.value.substr(0, 4));
            let mesIng = parseInt(this.value.substr(5, 6));


            if ((añoIng <= añoAct && mesIng <= mesAct) || (añoIng < añoAct)) {

                document.getElementById("vencimiento").innerHTML = "Tu tarjeta esta vencida";
            } else { document.getElementById("vencimiento").innerHTML = ""; }
        });


        $("#bankAccountNumber").blur(function() {
            if (isNaN(this.value)) {

                document.getElementById("bankNumero").innerHTML = "Solo se admiten caracteres numéricos";
            } else {
                document.getElementById("bankNumero").innerHTML = "";
            }
        });

        if (e.preventDefault) e.preventDefault();
        return false;


    });

    //controles para que al comprar no se encuentren campos incompletos


    //Se obtiene el formulario de compra de producto
    var compraForm = document.getElementById("compra-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Comprar'.
    compraForm.addEventListener("submit", function(e) {

        //controles para que la cantidad no sea menor a 0 

        let cantidadRequerida = document.getElementById("cantidadIngresada");

        //controles para método de envío

        let pais = document.getElementById("pais");
        let departamento = document.getElementById("departamento");
        let calleNameInput = document.getElementById("calle");
        let numeroInput = document.getElementById("numero");
        let esquina = document.getElementById("esquina");

        //controles para la forma de pago

        let cuentaBanco = document.getElementById('bankAccountNumber');
        let creditoNumero = document.getElementById("creditCardNumber");
        let cvv = document.getElementById("creditCardSecurityCode");
        let monthAndYear = document.getElementById("dueDate");



        let infoMissing = false;

        //Quito las clases que marcan como inválidos en cantidad de productos

        cantidadRequerida.classList.remove('is-invalid');

        //Quito las clases que marcan como inválidos en el método de envío

        pais.classList.remove('is-invalid');
        departamento.classList.remove('is-invalid');
        calleNameInput.classList.remove('is-invalid');
        numeroInput.classList.remove('is-invalid');
        esquina.classList.remove('is-invalid');

        //Quito las clases que marcan como inválidos en la froma de pago

        cuentaBanco.classList.remove('is-invalid');
        creditoNumero.classList.remove('is-invalid');
        cvv.classList.remove('is-invalid');
        monthAndYear.classList.remove('is-invalid');


        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado una cantidad no menor a 0

        if (cantidadRequerida.value === "0") {
            cantidadRequerida.classList.add('is-invalid');
            infoMissing = true;
        }

        //En este caso se controla que se haya ingresado el país, departamento, calle, número y esquina.

        if (pais.value === "0") {
            pais.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el departamento de envío
        if (departamento.value === "") {
            departamento.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la calle de envío
        if (calleNameInput.value === "") {
            calleNameInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el número de la localización de envío
        if (numero.value <= 0) {
            numero.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la esquina de envío
        if (esquina.value === "") {
            esquina.classList.add('is-invalid');
            infoMissing = true;
        }

        //En este caso se controla que se haya ingresado el número de tarjeta, código de seguridad y fecha de vencimiento.
        //Pero solo si esta seleccionado pagar con tarjeta

        if (document.getElementById("creditCardPaymentRadio").checked == true) {

            //Consulto por el número de tarjeta
            if (creditoNumero.value === "") {
                creditoNumero.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por el número del CVV
            if (cvv.value === "") {
                cvv.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por la fecha
            if (monthAndYear.value === "") {
                monthAndYear.classList.add('is-invalid');
                infoMissing = true;
            }


        }

        //En este caso se controla que se haya ingresado el número de cuenta bancaria.
        //Pero solo si esta seleccionado pagar por banco.

        if (document.getElementById("bankingRadio").checked == true) {

            //Consulto por el número de cuenta bancaria

            if (cuentaBanco.value === "") {
                cuentaBanco.classList.add('is-invalid');
                infoMissing = true;
            }



        }




        if (!infoMissing) {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.

            getJSONData(CART_BUY_URL).then(function(resultObj) {
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";

                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok') {
                    msgToShow = resultObj.data.cartBuy.msg;
                } else if (resultObj.status === 'error') {
                    msgToShow = ERROR_MSG;
                }

                bootbox.alert(msgToShow, null);
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
        return false;
    });

    //controles en la forma de pago para deshabilitar imputs

    document.getElementById("creditCardPaymentRadio").addEventListener("change", function() {

        if (document.getElementById("creditCardPaymentRadio").checked == true) {

            document.getElementById("creditCardNumber").removeAttribute("disabled")
            document.getElementById("creditCardSecurityCode").removeAttribute("disabled")
            document.getElementById("dueDate").removeAttribute("disabled")

            document.getElementById('bankAccountNumber').setAttribute("disabled", "")

        }

        formaDePago = "Tarjeta de crédito";

        document.getElementById("formaPay").innerHTML = formaDePago;

    });


    document.getElementById("bankingRadio").addEventListener("change", function() {

        if (document.getElementById("bankingRadio").checked == true) {

            document.getElementById('bankAccountNumber').removeAttribute("disabled")

            document.getElementById("creditCardNumber").setAttribute("disabled", "")
            document.getElementById("creditCardSecurityCode").setAttribute("disabled", "")
            document.getElementById("dueDate").setAttribute("disabled", "")

        }

        formaDePago = "Transferencia bancaria";

        document.getElementById("formaPay").innerHTML = formaDePago;
    });
});