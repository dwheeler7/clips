const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: { type: Schema.Types.ObjectId, ref: 'Clipping' }
    // itemCount : { type: Number }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isComplete: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('totalQty').get(function() {
  return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
  // 'this' is the Order model
  return this.findOneAndUpdate(
    // query
    { user: userId, isComplete: false },
    // update
    { user: userId },
    // upsert option will create the doc if
    // it doesn't exist
    { upsert: true, new: true }
  )
}

orderSchema.methods.addItemToCart = async function(itemId) {
  const cart = this  
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
  if (lineItem) {
    lineItem.qty += 1
  } else {
    const item = await mongoose.model('Clipping').findById(itemId);
    cart.lineItems.push({ item })
  }
  return cart.save()
}

orderSchema.methods.setItemQty = function(itemId, newQty) {  
  const cart = this  
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))  
  if (lineItem && newQty <= 0) {
    lineItem.deleteOne()
  } else if (lineItem) {
    lineItem.qty = newQty
  }
  return cart.save()
}

orderSchema.methods.setItemNum = function(itemId, num) {
  const cart = this
}


module.exports = mongoose.model('Order', orderSchema)