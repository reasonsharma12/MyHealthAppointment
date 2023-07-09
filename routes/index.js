var express = require('express');
var router = express.Router();
var patientinfo= require("../model/database");

router.get("/add", function (req, res, next) {
  patientinfo.find().then((patientDetails) => {
    res.render("dashboard", {patientDetails:patientDetails});
  });
});

router.get('/hospital', function(req, res, next) {
  res.render('hospital');
}); 
router.get('/hospitaldetail', function(req, res, next) {
  res.render('hospitaldetail',{hospitalName:'lumbiniTechnicalHopital', specialistNamesList: ["Ram", "Shyam"], specilities:"orthopedic"});
});


router.get('/appointmentform', function(req, res, next) {
  res.render('appointmentForm');
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

   await patientinfo.insertMany(formData) 
    res.redirect('/add');
  
});

router.get("/edit/:id", async function (req, res) {
  debugger
  const patientDetails =  await patientinfo.findOne(
    { _id: req.params.id}
    );

  let appointmentDate = patientDetails.appointmentDate;
  if (!appointmentDate) appointmentDate = new Date();

  const formattedAppointmentDate = [
    appointmentDate.getFullYear(),
    (appointmentDate.getMonth() + 1).toString().padStart(2, '0'),
    appointmentDate.getDate().toString().padStart(2, '0')
  ].join('-');

  let dateOfBirth = patientDetails.DateOfBirth;
  if (!dateOfBirth) dateOfBirth = new Date();

  const formattedBirthDate = [
    dateOfBirth.getFullYear(),
    (dateOfBirth.getMonth() + 1).toString().padStart(2, '0'),
    dateOfBirth.getDate().toString().padStart(2, '0')
  ].join('-');

  res.render("editAppointment", { patientDetails: patientDetails, formattedAppointmentDate, formattedBirthDate });
});



router.post("/saveEdited/:id", async function (req, res) {
 let formData= {
       FullName: req.body.FullName,
   Gender: req.body.Gender,
   DateOfBirth: req.body.DateOfBirth,
    Age: req.body.Age,
    Email:req.body.Email,
 PhoneNumber: req.body.PhoneNumber,
appoitmentDate: req.body.appoitmentDate,
  appoitmentTime: req.body.appoitmentTime
 };
await Expenses.findOneAndUpdate(
   {_id: req.params.id},
  { $set:{ ...formData } }


  );
  res.redirect('/')
});

module.exports = router;
