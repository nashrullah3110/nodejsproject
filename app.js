var firebase = require('firebase');
require("firebase/auth");
require("firebase/database");
 var firebaseConfig = {
    apiKey: "AIzaSyBkRb0S3gAjG1EG5tj6ZKz_qDiJl3b04AQ",
    authDomain: "ideahub-84a34.firebaseapp.com",
    databaseURL: "https://ideahub-84a34.firebaseio.com",
    projectId: "ideahub-84a34",
    storageBucket: "ideahub-84a34.appspot.com",
    messagingSenderId: "860246036703",
    appId: "1:860246036703:web:cdcba87ff583ae1a56d96a",
    measurementId: "G-YW5CCYMKWJ"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var express=require('express');
var bodyParser=require("body-parser");
var alert =require('alert-node');
var app= express();
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.post('/signup', function(req,res){ 
    name =req.body.name;
    email =req.body.email;
    pass = req.body.password; 
    var data = { 
        "name": name, 
        "email":email
    }
    firebase.auth().createUserWithEmailAndPassword(email,pass)
      .then((response)=>{
        var userid=firebase.auth().currentUser.uid;
         if(response){
          alert('SignUp successfully Login with your credentials');
          firebase.database().ref("Users/"+userid).set(data);
          res.sendFile(__dirname+'/signlog.html');
         }
        }
        ).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
       
        });
      })
    app.post('/signin', function(req,res){ 
      email =req.body.email;
      pass = req.body.password;
      firebase.auth().signInWithEmailAndPassword(email,pass).then(function(){
        var userid=firebase.auth().currentUser.uid;
        firebase.database().ref('Users/'+userid).once('value').then(function(snapshot) {
        var username =snapshot.val().name;
        })
      res.sendfile('home.html');
      }).catch(function(error){
        errmessage=error.message;
        alert(errmessage);
      })
      
      })
    app.post('/save', function(req,res){
    title =req.body.title;
    discription =req.body.discription; 
    var data = { 
      "Title": title, 
      "Discription":discription}
      var userid=firebase.auth().currentUser.uid;
  firebase.database().ref("Users/"+userid+'/ideas').push().set(data);
        alert("Successfully Saved");
})
      app.get('/shareform', function(req,res)
{
  res.sendFile(__dirname +'/share.html');
})
app.get('/logout', function(req,res)
{
  firebase.auth().signOut().then(function() {
    alert("Logout Successfully.");
    res.sendFile(__dirname +'/signlog.html');
  }).catch(function(error) {
    var errmessage=error.message;
    alert(errmessage)
  });
 
})
app.get('/', function(req,res)
{
  res.sendFile(__dirname +'/signlog.html');
})
app.get('/home', function(req,res)
{
  res.sendFile(__dirname +'/home.html');
})
app.get('/signlog', function(req,res)
{
  res.sendFile(__dirname +'/signlog.html');
})
app.get('/comfort_comfortable_contempora_A0_Rectangle_2_pattern', function(req,res)
{
  res.sendFile(__dirname +'//comfort_comfortable_contempora_A0_Rectangle_2_pattern.png');
})
app.get('/youtubeicon', function(req,res)
{
  res.sendFile(__dirname +'/youtube.png');
})
app.get('/instagramicon', function(req,res)
{
  res.sendFile(__dirname +'/instagram.png');
})
app.get('/twittericon', function(req,res)
{
  res.sendFile(__dirname +'/twitter.png');
})
var port='8000'
app.listen(port,()=>
{
  console.log('Server is running on port:'+port);
})

function newFunction(res, username) {
  res.render(__dirname + "/home.html", { 'name': username });
}
