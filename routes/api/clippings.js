const express = require('express')
const router = express.Router()
const clippingsCtrl = require('../../controllers/api/clippings')

// Index clippings where there are at least 1
router.get('/', clippingsCtrl.index)
// Index for clipper
router.get('/clipper/:clipperId', clippingsCtrl.indexOfClipper)
// Delete
router.delete('/:id', clippingsCtrl.destroy)
// Update
router.put('/:id', clippingsCtrl.update)
// Create
router.post('/', clippingsCtrl.create)
// Show
router.get('/:id', clippingsCtrl.index)