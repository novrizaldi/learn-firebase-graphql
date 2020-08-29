const firebase = require("firebase");

const getUsers = () => {
  const userReference = firebase.database().ref("/Users/");
  return (new Promise((resolve, reject)=>{
    userReference.on("value", function(snapshot) {

      console.log('ini di services',  snapshot.val());
      
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      }else{
        const data = Object.keys(folders).map(o => Object.assign({ Id: o }, folders[o]));
        resolve(data);
      }
      userReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    });
  }));
}

// create new instance 
const createUser = (user) => {

  const referencePath = `/Users/${user.Id}/`;
  const userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.update({Name : user.Name, Phone: user.Phone}, (error) => {
      if (error) {
        reject("data could not be added." + error);
      } else {
        resolve(user)
      }
    })
  }));
}

// update existing instance
const updateUser = (user) => { 

  const referencePath = `/Users/${user.Id}`;
  const userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.update({Name : user.Name, Phone: user.Phone}, (error) => {
      if (error) {
        reject(" data could not be updated." + error);
      } else {
        resolve(user);
      }
    })
  }));
}

// delete an instance
  const deleteUser = (user) => {
    
    const referencePath = `/Users/${user.Id}`
    const userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
      userReference.remove((error) => {
        if (error) {
          reject("data could not be deleted." + error);
        } else { 
          resolve(user);
        }
      })
    }));
  }

module.exports = {getUsers, createUser}