const express = require('express');
const bodyParser = require('body-parser');

require('dotenv/config')
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/ussd', (req, res) => {
  // Read the variables sent via POST from our API
  const {
    //uniquely generated when session start and sent every time
    //mobile subscriber response has been received
    sessionId,

    //unique short number that a user dials to initiate communication
    //from mobile phone to telecom
    serviceCode,

    //mobile number of subscriber (developer)
    phoneNumber,

    //user input text
    text,
  } = req.body;

  let response = '';

  //conditions classifying user to determine type of feedback
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    response = `CON What would you like to check
    1. My account
    2. My phone number`;
  } else if ( text == '1') {
    // Business logic for first level response
    response = `CON Choose account information you want to view
    1. Account number
    2. Account balance`;
  } else if ( text == '2') {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your phone number is ${phoneNumber}`;
  } else if ( text == '1*1') {
    // This is a second level response where the user selected 1 in the first instance

    //hardcoded
    //if connected to db look customer with that phone number and send
    //account number
    const accountNumber = 'ACC100101';
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  } else if ( text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    const balance = 'KES 10,000';
    // This is a terminal request. Note how we start the response with END
    
    //can be obtained from database
    response = `END Your balance is ${balance}`;
  }

  // Send the response back to the API
  res.set('Content-Type: text/plain');
  res.send(response);

});

let PORT = process.env.PORT || 80;
app.listen(PORT, () =>{
  console.log("Listening on port : ", PORT);
})
