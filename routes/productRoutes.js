const express = require('express');
const Product = require('../models/Product');
const router = express.Router();






router.get('/products', async (req, res) => {
    const products = await Product.find({})


    res.send(products);
})



router.get('/products/:id', async (req, res) => {
    const products = await Product.findById(req.params.id)

    if (products) {
        res.send(products);
    } else {
        return res.status(404).send({ error: 'böyle bir ürün yok' })
    }

})




router.post('/products', async (req, res) => {



    const { name, category, description, image, price } = req.body;


    const productExist = await Product.findOne({ name })
    try {
        if (productExist) {
            return res.status(200).send({ error: 'Bu ürün mevcut' })

        }


        const product = await Product.create({
            name, category, description, image, price
        })



        product.save()
        res.send(product)

    } catch (err) {
        return res.status(200).send({ error: 'eksik alan girdiniz' })
    }










})



module.exports = router;