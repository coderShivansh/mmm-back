const router = require('express').Router();
let Contact = require('../models/Contact');

router.route('/').post((req, res) => {
  const { name, email, phone, query } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    query,
  });

  newContact.save()
    .then(() => res.json('Contact added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
