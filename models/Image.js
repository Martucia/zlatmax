const { Schema, model, Types } = require('mongoose')

// const schema = new Schema({
//     name: { type: String, required: true },
//     image: {
//         data: Buffer,
//         contentType: String
//     }
// })

const schema = new Schema({
    isMain: { type: Boolean, required: true },
    url: { type: String, required: true }
})


module.exports = model('Image', schema)