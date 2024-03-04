const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    text: {type: String},
    author: {type: String, required: true},
    authorId: {type: Types.ObjectId, ref: 'User'},
    rate: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'Product'}
})

module.exports = model('Review', schema)