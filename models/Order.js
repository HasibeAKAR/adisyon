const mongoose = require('mongoose');




const orderSchema = new mongoose.Schema({

    tableNo: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    orderTime: {
        type: Date,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidTime: {
        type: Date,
    }

})


module.exports = mongoose.model('Order', orderSchema);