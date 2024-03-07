const Clipping = require('../../models/clipping')

module.exports = {
    index, 
    indexOfClipper,
    destroy,
    update,
    create,
    show
}

const index = async (req, res) => {
    try {
        const clippings = await Clipping.find({ clippingsNum: {$gt: 0} })
        res.status(200).json(clippings)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

const indexOfClipper = async (req, res) => {
    try {
        const clippings = await Clipping.find({ clipper: req.params.clipperId, clippingsNum: {$gt: 0} })
        res.status(200).json(clippings)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

const destroy = async (req, res) => {
    try {        
        const clipping = await Clipping.findOneAndDelete({_id: req.params.id})
        req.user.clippings.pull(clipping)
        await req.user.save()
        res.status(200).json('Clipping successfully deleted')
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

const update = async (req, res) => {
    try {
        const clipping = await Clipping.findOneAndUpdate({_id : req.params.id}, req.body, { new: true })
        res.status(200).json(clipping)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

const create = async (req, res) => {
    try {
        const clipping = await Clipping.create(req.body)
        clipping.clipper = req.user._id
        req.user.clippings.push(clipping._id)
        await clipping.save()
        await req.user.save()
        res.status(200).json(clipping)
    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}

const show = async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json({ msg: err.message })
    }
}