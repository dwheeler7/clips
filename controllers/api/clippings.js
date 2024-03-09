const Clipping = require('../../models/clipping')
const User = require('../../models/user')

module.exports = {
    index, 
    indexOfClipper,
    destroy,
    update,
    create,
    show
}

async function index (req, res) {
    try {
        const clippings = await Clipping.find({ clippingsNum: {$gt: 0} })
        res.status(200).json(clippings)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

async function indexOfClipper(req, res) {
    try {
        const clippings = await Clipping.find({ clipper: req.params.clipperId, clippingsNum: {$gt: 0} })
        res.status(200).json(clippings)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

async function destroy (req, res) {
    try {        
        const clipping = await Clipping.findOneAndDelete({_id: req.params.id})
        req.user.clippings.pull(clipping)
        await req.user.save()
        res.status(200).json('Clipping successfully deleted')
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

async function update (req, res) {
    try {
        const clipping = await Clipping.findOneAndUpdate({_id : req.params.id}, req.body, { new: true })
        res.status(200).json(clipping)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

async function create (req, res) {
    try {        
        req.body.clipper = req.user._id        
        // removing roles from scope, setting everyone to clipper
        // if(!req.user.isClipper) throw new Error('Must be clipper to add a clipping')
        const clipping = await Clipping.create(req.body)        
        const user = await User.findById(req.user._id)
        user.clippings.push(clipping._id)
        await user.save()        
        res.status(200).json(clipping)
    } catch(err) {        
        res.status(400).json({ msg: err.message })
    }
}

async function show(req, res) {
    try {        
        const clipping = await Clipping.findOne({ _id: req.params.id })
        res.status(200).json(clipping)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}