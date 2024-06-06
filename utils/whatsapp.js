const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendWhatsAppMessage = (to, body) => {
  client.messages.create({
    body,
    from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_FROM,
    to: 'whatsapp:' + to,
  })
  .then(message => console.log('WhatsApp message sent: ' + message.sid))
  .catch(error => console.log(error));
};

module.exports = sendWhatsAppMessage;
