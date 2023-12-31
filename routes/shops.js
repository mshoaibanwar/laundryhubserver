const router = require('express').Router();
let Shop = require('../models/shop.model');
var ObjectId = require('mongodb').ObjectID;

router.route('/').get((req, res) => {
    Shop.find()
        .then((Shops) => {
                res.json(Shops);
        })
        .catch(err => res.status(404).json('Shops not found' + err));
});

router.route('/count/').get((req, res) => {
    Shop.find()
        .then(() => {
                Shop.countDocuments()
                .then((count)=> res.json({"Count": count}))
                .catch(err => res.status(404).json("Count Error: " + err));
        })
        .catch(err => res.status(404).json("Error: " + err));
});

router.route('/updateTiming/:id').post((req, res) => {
        const timing = req.body.timing;
    Shop.findByIdAndUpdate(req.params.id ,{ timing: timing })
        .then((updated) => {
                res.json("Timing Updated!");
        })
        .catch(err => res.status(404).json('Shops not found' + err));
});

router.route('/updatePrices/:id').post((req, res) => {
        const uprices = req.body.prices;
    Shop.findOneAndUpdate({uid: req.params.id} ,{ prices: uprices })
        .then((updated) => {
                res.json("Services Updated");
        })
        .catch(err => res.status(404).json('Shops not found' + err));
});

router.route('/getPrices/:id').get((req, res) => {
    Shop.find({uid: req.params.id})
        .then((shop) => {
                res.json(shop[0].prices);
        })
        .catch(err => res.status(404).json('Shop not found' + err));
});

router.route('/user/:uid').get((req, res) => {
    // let obid = `ObjectId('${req.params.id}')`;
    Shop.find({uid : req.params.uid})
        .then((shop) => {
                res.json(shop);
        })
        .catch(err => res.status(404).json(`Shop with id: ${req.params.id} not found`));
});

router.route('/add').post((req, res) => {
    const uid = req.body.uid;
    const title = req.body.title;
    const address = req.body.address;
    const lati = req.body.lati;
    const longi = req.body.longi;
    const cnic = req.body.cnic;
    const cnicimgs = req.body.cnicimgs;
    const status = req.body.status;
    const contact = req.body.contact;
            
    const newShop = new Shop();
    newShop.uid = uid;
    newShop.title = title;
    newShop.address = address;
    newShop.lati = lati;
    newShop.longi = longi;
    newShop.cnic = cnic;
    newShop.cnicimgs = cnicimgs;
    newShop.status = status;
    newShop.contact = contact;
            
    newShop.save()
        .then(() => res.json('Shop Added!'))
        .catch(err => res.status(404).send(err));

});

router.route('/edit/:id').post((req, res) => {

        const title = req.body.title;
        const address = req.body.address;
        const contact = req.body.contact;
            
    Shop.findByIdAndUpdate(req.params.id, 
        {title: title, address: address, contact: contact})
        .then(() => res.json('Shop Data Updated!'))
        .catch(err => res.status(404).send(err));

});

router.route('/delete/:id').post((req, res) => {
            
    Shop.findByIdAndDelete(req.params.id)
        .then(() => res.json('Shop Deleted!'))
        .catch(err => res.status(404).json(err));

});

module.exports = router;