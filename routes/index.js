var express = require('express');
var router = express.Router();
var PatientList= require("../model/database");

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

router.get('/appointmentform', function(req, res, next) {
  res.render('appointmentForm');
});
router.post('/saveappointment', function(req, res, next) {
  res.render('index');
});

module.exports = router;
