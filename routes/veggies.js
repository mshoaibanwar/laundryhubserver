const router = require('express').Router();
let Veggie = require('../models/veggie.model');

router.route('/').get((req, res) => {
    Veggie.find()
        .then((cats) => {
                res.json(cats);
        })
        .catch(err => res.status(404).json('Veggies not found' + err));
});

router.route('/count/').get((req, res) => {
    Veggie.find()
        .then(() => {
                Veggie.countDocuments()
                .then((count)=> res.json({"Count": count}))
                .catch(err => res.status(404).json("Count Error: " + err));
        })
        .catch(err => res.status(404).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    // let obid = `ObjectId('${req.params.id}')`;
    Veggie.findById(req.params.id)
        .then((cat) => {
                res.json(cat);
        })
        .catch(err => res.status(404).json(`Veggie with id: ${req.params.id} not found`));
});

router.route('/add').post((req, res) => {

    const name = req.body.title;
    const newVeggie = new Veggie();          
    newVeggie.title = name;
            
    newVeggie.save()
        .then(() => res.json('Veggie Added!'))
        .catch(err => res.status(404).json(err));

});

router.route('/delete/:id').post((req, res) => {
            
    Veggie.findByIdAndDelete(req.params.id)
        .then(() => res.json('Veggie Deleted!'))
        .catch(err => res.status(404).json(err));

});

module.exports = router;