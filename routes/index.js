var express = require('express');
var router = express.Router();
var patientinfo= require("../model/patientList");
var hospitalInfo= require("../model/hospitalList");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/hospital', function(req, res, next) {
  
  hospitalInfo.find().then((information) => {
   
  res.render('hospital',{  hospitalList: information });
  }); 
}); 

router.get("/hospitaldetail/:id", async function (req, res) {
  const information = await hospitalInfo.findOne({ _id:req.params.id})
  res.render("hospitaldetail", { information: information});
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
    res.redirect('/');
  
});

router.get('/appointmentform', function(req, res, next) {
  res.render('appointmentForm');
});
router.post('/saveappointment', function(req, res, next) {
  res.render('index');
});

router.get ('/add',function(req,res){
  res.render('dashboard')
});

module.exports = router;
