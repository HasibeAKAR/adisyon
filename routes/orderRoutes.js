const express = require('express');
const Order = require('../models/Order');
const router = express.Router();






router.get('/orders', async (req, res) => {
    const orders = await Order.find({})


    res.send(orders);
})



router.get('/orders/:id', async (req, res) => {
    const orders = await Order.findById(req.params.id)

    if (orders) {
        res.send(orders);
    } else {
        return res.status(404).send({ error: 'boyle bir siparis yok' })
    }

})


router.put('/orders/:id/success', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidTime = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('boyle bir siparis yok')
    }



})


router.post('/orders', async (req, res) => {



    const { tableNo, product } = req.body;

    try {
        const orderTime = Date.now();
        const order = await Order.create({
            tableNo, product, orderTime
        })

        order.save()
        res.send(order)

    } catch (err) {

        return res.status(200).send({ error: 'hata' })
    }
})



module.exports = router;