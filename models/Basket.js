const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    products: [{type: Types.ObjectId, ref: "BasketProduct"}],
    owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Basket', schema)