const firebase = require("firebase");

const getUsers = () => {
  const userReference = firebase.database().ref("/Users/");
  return (new Promise((resolve, reject)=>{
    userReference.on("value", function(snapshot) {
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      }else{
        const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
        resolve(data);
      }
      userReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    });
  }));
}

module.exports = {getUsers}