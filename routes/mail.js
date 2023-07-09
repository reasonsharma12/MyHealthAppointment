var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  const name = ' Full Name';
const email = 'rachita.maharjan1@gmail.com';
const subject = 'Test Subject';
const message = 'confirmed your  email neww';

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + btoa(""+":" +''));
  
    const data = JSON.stringify({
      "Messages": [{
        "From": {"Email": "paudelsabina345@gmail.com", "Name": "My Health Appointment"},
        "To": [{"Email": email, "Name": name}],
        "Subject": subject,
        "TextPart": message
      }]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };
  
    fetch("https://api.mailjet.com/v3.1/send", requestOptions)
      .then(response => {
        debugger
        console.log('..', response)
        return response.text()
      })
      .then(result => {
        debugger
        console.log(result)
      })
      .catch(error => {
        console.log('error', error)
      });
    }
);

module.exports = router;
