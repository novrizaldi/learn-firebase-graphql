var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/', function (req, res) {
  const userReference = firebase.database().ref("/Users/");

  userReference.on("value", function (snapshot) {
    console.log('ini di router', snapshot.val());
    res.json(snapshot.val());
    userReference.off("value");
  }, function (errorObject){
    console.log("the read failed :" + errorObject.code);
    res.send("the read failed" + errorObject.code);
  })
});

router.post('/', function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;

  const referencePath = '/Users/' + id + '/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({
    Name : name, 
    Phone : phone
  }, function(error){
  if(error){
    res.send("data could not be saved" + error);
  } else {
    res.send("data saved successfully.");
  }
  })
});

router.put('/:id', function (req, res) {
  const { name, phone } = req.body
  const id = req.params.id
  
  const referencePath = '/Users/'+id+'/';
  const userReference = firebase.database().ref(referencePath);
  userReference.update({Name : name, Phone: phone}, function(error) {
    if (error) {
      res.send("data couldn't be updated." + error)
    } else { 
      res.send("data updated successfully.");
    }
  })
})

module.exports = router;