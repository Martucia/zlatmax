const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    // catalogImg: { type: Buffer, required: true },
    catalogImg: { type: String, required: true },
    // productImg: [{ type: Types.ObjectId, ref: 'Image' }],
    productImg: [{ url: String }],
    size: { type: String, required: true },
    material: { type: String, required: true },
    manufacture: { type: String, required: true },
    steel: { type: String, required: true },
    handle: { type: String, required: true },
    guardback: { type: String, required: true },
    gilding: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    trademark: { type: String, required: true },
    serie: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    onsale: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    rate: { type: Number, default: 5 },
    reviews: [{ type: Types.ObjectId, ref: 'Review' }]
})

module.exports = model('Product', schema)

// vendor: {type: String, required: true, unique: true},