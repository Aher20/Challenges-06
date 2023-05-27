const express = require('express');
const router = express.Router();
const component = require('../controller/component');
const product = require('../controller/product');
const supplier = require('../controller/supplier');
const product_components = require('../controller/product_components');
const component_suppliers = require('../controller/component_suppliers');

router.get('/', (req, res) => res.status(200).json({message: "welcome to api challenge_04"}));

router.get('/components', component.index); // show all
router.get('/components/:id', component.show); // show one
router.post('/components', component.store); // create data
router.put('/components/:id', component.update); // update data
router.delete('/components/:id', component.destroy); // hapus data

router.get('/products', product.index);
router.get('/products/:id', product.show);
router.post('/products', product.store);
router.put('/products/:id', product.update);
router.delete('/products/:id', product.destroy);

router.get('/suppliers', supplier.index);
router.get('/suppliers/:id', supplier.show);
router.post('/suppliers', supplier.store);
router.put('/suppliers/:id', supplier.update);
router.delete('/suppliers/:id', supplier.destroy);

router.get('/product-components', product_components.index); // show all
router.get('/product-components/:id', product_components.show); // show one
router.post('/product-components', product_components.store); // create data
router.put('/product-components/:id', product_components.update); // update data
router.delete('/product-components/:id', product_components.destroy); // hapus data

router.get('/component-suppliers', component_suppliers.index); // show all
router.get('/component-suppliers/:id', component_suppliers.show); // show one
router.post('/component-suppliers', component_suppliers.store); // create data
router.put('/component-suppliers/:id', component_suppliers.update); // update data
router.delete('/component-suppliers/:id', component_suppliers.destroy); // hapus data

module.exports = router;
