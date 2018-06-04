const express = require('express');
const Map = require('../models/map');

const router = express.Router();

router.put('/', (req, res) => {
    let _new = new Map(req.body);
    _new.save((err, data) => {
        if (err)
            return res.sendStatus(500);
        return res.json(data);
    })
})

router.get('/', (req, res) => {
    Map.find({}, { name: true, _id: true }, (err, data) => {
        if (err)
            return res.sendStatus(500);
        return res.json(data);
    })
})
router.get('/:id', (req, res) => {
    Map.findById(req.params.id, {}, (err, data) => {
        if (err)
            return res.sendStatus(500);
        return res.json(data);
    })
})
router.delete('/:id', (req, res) => {
    Map.remove(req.params.id, { name: true, _id: true }, (err, data) => {
        if (err)
            return res.sendStatus(500);
        return res.json({ _id: req.params.id });
    })
})
router.post('/:id', (req, res) => {
    Map.findById(req.params.id, { name: true, _id: true }, (err, data) => {
        if (err)
            return res.sendStatus(500);
        Object.assign(data, req, body);
        data.save((err, saved) => {
            if (err)
                return res.sendStatus(500);
            return res.json(saved);
        })
    })
})
module.exports = router;