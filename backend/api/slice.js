const express = require('express');
const Slice = require('../models/slice');
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
require('express-ws')(router);

const storage = multer.diskStorage({
    destination: '/tmp',
    filename(req, file, cb) {
        cb(null, `${new Date()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

/**
 * @api {get} /api/slice/ List
 * @apiDescription List Slices
 * 
 * @apiGroup Slice
 *
 */
router.get('/', (req, res) => {
    let query = {};
    if (req.query.name) {
        query.name = new RegExp(req.query.name + '*', 'i')
    }
    Slice.find(query, { images: false }, (err, list) => {
        res.json(list || []);
    })
});
router.get('/:id/image/:index', (req, res) => {
    if (!req.params.id || !req.params.index) {
        return res.sendStatus(500);
    }
    Slice.findById(req.params.id, { images: true }, (err, data) => {
        if (!data || !data.images) return res.sendStatus(404);
        res.send(data.images[req.params.index % data.images.length].image);
    })
});
router.get('/:id/imageByValue/:value', (req, res) => {
    if (!req.params.id || !req.params.value) {
        return res.sendStatus(500);
    }
    Slice.findOne({ _id: req.params.id }).select(
        {
            'images':
                {
                    '$elemMatch':
                        {
                            '$or': [
                                {
    
                                    'status': req.params.value
                                },
                                {
    
                                    'status':
                                        { '$lte': req.params.value }
                                },{
                                    'status':
                                        { '$exists': false }
                                }
                            ]
                        }
                }
        }
    ).exec((err, data) => {
        console.log("ERROR:", err);
        console.log("DATA:", data);
        if (!data || !data.images || data.images.length == 0) return res.sendStatus(404);
        res.send(data.images[0].image);
    })
});

/**
 * @api {put} /api/slice/ Add
 * @apiDescription Add New Slice
 * 
 * @apiGroup Slice
 *
 */
router.put('/', upload.any(), (req, res) => {
    let data = JSON.parse(req.body.values);
    console.log(req.files);
    for (let i = 0; i < data.images.length; i++) {
        data.images[i].image = fs.readFileSync(req.files[i].path)
    }
    let _new = Slice(data);
    _new.save((err, data) => {
        if (err || !data) {
            res.status(500).send(err);
        }
        res.json(data);
    })
});
router.delete('/:id', (req, res) => {
    Slice.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ _id: req.params.id });
    })
})
module.exports = router