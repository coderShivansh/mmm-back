const router = require('express').Router();
let Contact = require('../models/contact');
const sendEmail = require('../utils/mailer');
const sendWhatsAppMessage = require('../utils/whatsapp');

// POST: Add a new contact
router.route('/').post((req, res) => {
  const { name, email, phone, query } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    query,
  });

  newContact.save()
    .then(() => {
      res.json('Contact added!');
      
      // Send email
      const emailText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nQuery: ${query}`;
      sendEmail(process.env.RECEIVER_EMAIL, 'New Contact Form Submission of MakeMyMVP', emailText);

      // Send WhatsApp message
      const whatsappText = `New contact form submission of MakeMyMVP:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nQuery: ${query}`;
      sendWhatsAppMessage(process.env.RECEIVER_WHATSAPP, whatsappText);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET: Retrieve all contacts
router.route('/').get((req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
