var express = require('express');
var router = express.Router();
var firebase = require("firebase");

//Fetch instances
router.get('/', function (req, res) {
  const userReference = firebase.database().ref("/Users/");
  //Attach an asynchronous callback to read the data
  userReference.on("value", function(snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
    userReference.off("value");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send("The read failed: " + errorObject.code);
  });
});

//Create new instance
router.post('/', function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;

  const referencePath = '/Users/'+id+'/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({Name: name, Phone: phone}, function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
});

module.exports = router;