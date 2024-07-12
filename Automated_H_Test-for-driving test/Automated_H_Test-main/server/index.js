// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const Automated_H_TestModel = require('./models/Automated_H_Test')

// const app = express()
// app.use(express.json())
// app.use(cors())

// mongoose.connect("mongodb://127.0.0.1:27017/Automated_H_Test");

// app.post('/users', (req,res) => {
//     Automated_H_TestModel.create(req.body)
//     .then(Automated_H_Test => res.json(Automated_H_Test))
//     .catch(err => res.json(err))

// })

// app.listen(3001,()=>{
//     console.log("server is running")
// })

// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User"); // Import the User model instead of Automated_H_Test
const bookingRoutes = require("./slotbooking/booking.routes");
const userDetails = require("./slotbooking/getUserDetails");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://josephtomy02:nypTxnJpT33mUMxx@cluster0.q0pzxp5.mongodb.net/automated_h_test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb server");
  });

app.post("/users", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.use("/api", bookingRoutes);
app.get("/verifyUser", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  //const password = encodeURIComponent(req.query.password);
  // Encode the password again to handle special characters like #
//const password = encodeURIComponent(encodeURIComponent(req.query.password));

  console.log("Got username from front end", username);
  console.log("Got password from front end", password);
  const data = await userDetails.fetchUsers();
  // console.log(data);
 
  if (Array.isArray(data) && data.length > 0) {
    // console.log(data.length)
    // const isValidUsernamePassword = data.some(
    //   (userObj) => userObj.name === username && userObj.password === password
     
    // );
   // console.log('hello')
    let i = 0;
    let isValidUsernamePassword = false;

    // Iterate through each user object in the data array
    while (i < data.length && !isValidUsernamePassword) {
      const userObj = data[i];
      //console.log(userObj)
      // console.log(userObj.name)
     
      // console.log(userObj.password)
      // console.log(username)
      // console.log(password)
     // console.log('hello')
      // Check if username and password match
      if (userObj.name == username && userObj.password ==password) {
        isValidUsernamePassword = true;
        console.log(isValidUsernamePassword)
        break;
      }
      i++; // Move to the next user object
    }
    res.send(isValidUsernamePassword);
  } else {
    console.log('hey')
    return res.status(404).send(false);
  }
});

// app.get("/verifyUser", async (req, res) => {
//   const username = req.query.username;
//   const password = req.query.password;
//   console.log("Got username from front end", username);
//   console.log("Got password from front end", password);
//   const data = await userDetails.fetchUsers();
//   console.log("Number of users fetched:", data.length);

//   // Check if data is an array and has at least one element
//   if (Array.isArray(data) && data.length > 0) {
    
//     let isValidUsernamePassword = false;

//     // Iterate over each user object in the data array
//     data.forEach((userObj) => {
//       // Check if username and password match
//       if (userObj.name === username && userObj.password === password) {
//         isValidUsernamePassword = true;
       
//       }
//     });

    // Send the result back to the client
//     res.send(isValidUsernamePassword);
//   } else {
//     // If data array is empty or not an array, return false
//     return res.status(404).send(false);
//   }
// });

app.listen(3001, () => {
  console.log("server is running");
});
