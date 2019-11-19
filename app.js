import express from 'express';
//import jsons
import cate from './json/categoria';
import prodInfo from './json/prodInfo';
import prod from './json/prod';
import catInfo from './json/catInfo';
import cartInfo from './json/cartInfo';
import cartBuy from './json/cartBuy';
import publish from './json/publish';

//import api from './app.js'
// Set up the express app
const app = express();

// se crean las url que contienen los json's

app.get('/json/categorias', (req, res) => {
    res.status(200).send({
        cate
    })
});

app.get('/json/publish', (req, res) => {
    res.status(200).send({
        publish
    })
});

app.get('/json/producto', (req, res) => {
    res.status(200).send({
        prod
    })
});

app.get('/json/productoInfo', (req, res) => {
    res.status(200).send({
        prodInfo
    })
});

app.get('/json/categoInfo', (req, res) => {
    res.status(200).send({
        catInfo
    })
});

app.get('/json/carritoBuy', (req, res) => {
    res.status(200).send({
        cartBuy
    })
});

app.get('/json/carritoInfo', (req, res) => {
    res.status(200).send({
        cartInfo
    })
});


//link a la pagina principal

app.use('/proyecto-jap', express.static('public'));




app.listen(3000, function() {
    console.log('Aplicación, escuchando el puerto 3000!');
});