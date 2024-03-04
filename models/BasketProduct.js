const { Schema, model, Types } = require('mongoose')

// const schema = new Schema({
//     name: {type: String, required: true},
//     price: {type: Number, required: true},
//     owner: {type: Types.ObjectId, ref: 'User'},
//     productId: {type: Types.ObjectId, ref: 'Product'},
//     catalogImg: { type: String, required: true },
//     count: {type: Number, default: 1}
// })

const schema = new Schema({
    data: { type: Types.ObjectId, ref: "Product" },
    count: { type: Number, default: 1 }
})

module.exports = model('BasketProduct', schema)