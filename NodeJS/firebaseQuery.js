var admin = require("firebase-admin");
var serviceAccount = require('./service-account.json');
var FirebaseInitializeApp=admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:"https://iot-thcntt1.firebaseio.com"
}
);
var db = admin.database();

var logNode= db.ref('/log')
function PushUserData(FullSensordataAsJSON, UserID = 'Duybeo') {
    db.ref('user').child(UserID).update(
        FullSensordataAsJSON
    )
}
function PushPumpState(data) {
    db.ref('user').child('Duybeo').update(
        {
            "pump": data
        }, () => {
            console.log("Susses trun on pump State")
        }
    )
}
function autoPush(LogData){
    let timeset = new Date
    logNode.child('test').child(timeset.toString()).set(
      LogData
    )
}
function ReadState(){
    let readState
    port1.once('data',data=>{
      try {
        readState = JSON.parse(data);
      } catch (error) {
        
      }
    })
    return readState;
  }

module.exports = {
    db,admin,logNode,serviceAccount,FirebaseInitializeApp,
    PushPumpState,autoPush,PushUserData
}
// db.child('timestamp').on('child_changed',(childSnapshot,prevChildKey)=>{
//   childSnapshot.key
//   childSnapshot.val()
//   console.log(childSnapshot.val());
// })