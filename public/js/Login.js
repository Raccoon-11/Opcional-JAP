function logueo() {
    var usuario = document.getElementById("user").value;
    var contraseña = document.getElementById("contra").value;
    var usuario1 = document.getElementById("user").value;
    var contraseña2 = document.getElementById("contra").value;


    if (usuario == usuario1 && contraseña == contraseña2 && usuario !== "" && contraseña !== "") {
        window.location.href = "http://localhost:3000/proyecto-jap/index.html";
        return true;


    } else {

        console.log(false);

    }



}

function storageGuardar() { //se guarda el nombre ingresado en el formulario

    localStorage.nombre = document.getElementById("user").value; //se guarda en .nombre de local storage
}

function recuperarDatos() { //recupera el nombre ingresado y o coloca en el menu desplegable cuando carga la pagina
    if (localStorage.nombre != undefined) {
        document.getElementById("dropDownMenu").innerHTML = localStorage.nombre;
    } else {
        document.getElementById("dropDownMenu").innerHTML = localStorage.usuario;
    }
}

function borrarDatos() {
    localStorage.clear();
}

function redirectionOfUser() { //si no esta logueado se redirecciona al login
    if (localStorage.nombre == undefined && localStorage.usuario == undefined) {
        var statusOfConfirm = confirm("Usted no ha iniciado sesión, para poder acceder a esta sección tiene que estar logueado, quiere loguearse?");
        if (statusOfConfirm == true) {
            window.location.href = "http://localhost:3000/proyecto-jap/Login.html";
        } else {
            alert("No puede acceder, será redirigido a la página principal");
            window.location.href = "http://localhost:3000/proyecto-jap/index.html";
        }


    }
}

//funciones de API OAuth

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    localStorage.usuario = profile.getName();




    if ((googleUser.isSignedIn() == true) || (logueo() == true)) {

        window.location.href = "http://localhost:3000/proyecto-jap/index.html";

    }

}

function signOut() { //cerrar sesión en Google API
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        auth2.disconnect();
    });

}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}