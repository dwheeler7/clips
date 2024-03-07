const { model, Schema } = require('mongoose')

const clippingSchema = new Schema({
    plant: {type: String, required: true},
    clippingsNum: {type: Number, required: true},
    description: {type: String},
    clipper: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

const Clipping = model('Clipping', clippingSchema)

module.exports = Clipping