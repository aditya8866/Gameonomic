

require('dotenv').config()
const { Resend } = require('resend');
const express = require('express');

const resend = new Resend('re_3WwFao5x_FzbgEiTZhijo7LV5tAX9N5vJ');
const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: 'Website <website@resend.dev>',
      to: ['adityasaini63555@gmail.com'],
      subject: 'Hello World',
      html: 'Hi this is the testing of resend email , which we are going to integrate into our gameonomics project opt for .................. 2555',
    });

    res.status(200).json(data);
  } catch(error) {
    res.status(400).json(error);
  }
})

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) {
    throw `Abort: You need to define RESEND_API_KEY in the .env file.`;
  }
  
  console.log('Listening on http://localhost:3000');
});