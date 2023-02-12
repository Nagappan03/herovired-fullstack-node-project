const path = require('path');

const express = require('express');
const {body} = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', [
    body('title', 'Please enter a valid product title of atleast 3 characters').isString().isLength({min: 3}).trim(),
    body('imageUrl', 'Please enter a valid URL').isURL(),
    body('price', 'Please enter a valid price in INR').isFloat(),
    body('description', 'Please enter a valid product description of atleast 5 characters').isLength({min: 5, max: 400})
], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title', 'Please enter a valid product title of atleast 3 characters').isString().isLength({min: 3}).trim(),
    body('imageUrl', 'Please enter a valid URL').isURL(),
    body('price', 'Please enter a valid price in INR').isFloat(),
    body('description', 'Please enter a valid product description of atleast 5 characters').isLength({min: 5, max: 400})
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;