var express = require('express');
var router = express.Router();
var patientinfo= require("../model/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/hospital', function(req, res, next) {
  res.render('hospital');
}); 
router.get('/hospitaldetail', function(req, res, next) {
  res.render('hospitaldetail',{hospitalName:'lumbiniTechnicalHopital', specialistNamesList: ["Ram", "Shyam"], specilities:"orthopedic"});
});

router.post("/saveappointment",  async function (req, res, next) {
  let formData = new patientinfo (
    {
      "FullName":req.body.FullName,
      "Gender": req.body.Gender,
      "DateOfBirth": req.body.DateOfBirth,
      "Age":req.body.Age,
      "Email":req.body.Email,
      "PhoneNumber": req.body.PhoneNumber,
      "appoitmentDate": req.body.appoitmentDate,
      "appoitmentTime": req.body.appoitmentTime,
    }
  );
  // console.log(formData);
  // expenses.push({ ...formData, _id: expenses.length + 1 });
  // res.redirect("/");

   await patientinfo.insertMany(formData) 
    res.redirect('/');
  
});

router.get('/appointmentform', function(req, res, next) {
  res.render('appointmentForm');
});
router.post('/saveappointment', function(req, res, next) {
  res.render('index');
});

module.exports = router;
