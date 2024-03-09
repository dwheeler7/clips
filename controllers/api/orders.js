const Order = require('../../models/order')
const Clipping = require('../../models/clipping')
const clippingsCtrl = require('../../controllers/api/clippings')

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history
}

// A cart is the unpaid order for a user
async function cart(req, res) {
  try{
    const cart = await Order.getCart(req.user._id)
    res.status(200).json(cart)
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  try{
    const itemId = req.params.id
    const cart = await Order.getCart(req.user._id)
    await cart.addItemToCart(itemId)    
    res.status(200).json(cart)
  }catch(e){
    res.status(400).json({ msg: e.message })
  }  
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try{
    const cart = await Order.getCart(req.user._id)
    await cart.setItemQty(req.body.itemId, req.body.newQty)
    res.status(200).json(cart)
  }catch(e){
    res.status(400).json({ msg: e.message })
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try{
    const cart = await Order.getCart(req.user._id)
    const lineItems = req.body.lineItems
    let itemSums = []
    
    const promises = lineItems.map(item => {
      return Clipping.findOne({ _id: item.item })
        .then(foundClipping => {
          if (!foundClipping) throw new Error('Could not find clipping from cart')
          const sum = foundClipping.clippingsNum - item.qty
          if (sum < 0) throw new Error(`There aren't enough clippings of the ${foundClipping.plant}. Logout, log back in, and try again.`)
          return sum
        })
    })
    
    itemSums = await Promise.all(promises);

    lineItems.forEach((item, idx) => {
      const updateOrDeleteClipping = async item => {
        try {
          const sum = itemSums[idx]          
        if (sum) {          
          await Clipping.findOneAndUpdate({_id : item.item}, {clippingsNum: sum}, { new: true })          
        } else {
          await Clipping.findOneAndDelete({_id : item.item})          
        }
        } catch(err) {
          res.status(400).json({ msg: err.message })    
        }
      }
      updateOrDeleteClipping(item)
    })    
    cart.isComplete = true
    await cart.save()
    res.status(200).json(cart)
  }catch(e){
    res.status(400).json({ msg: e.message })
  }  
}

// Return the logged in user's paid order history
async function history(req, res) {
  // Sort most recent orders first
  try{
    const orders = await Order
      .find({ user: req.user._id, isComplete: true })
      .sort('-updatedAt').exec()
    res.status(200).json(orders)
  }catch(e){
    res.status(400).json({ msg: e.message })
  }

}