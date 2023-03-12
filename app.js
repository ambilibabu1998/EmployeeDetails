// Task1: initiate app and run server at 3000
const express = require('express')
const app =express()
const logger = require('morgan')
const cors = require('cors')
 const mongoose = require('mongoose')
 const request = require('request');
  const Employee = require('./model/employee');
  const router = express.Router();

//  const {studentData} = require("./model/students")

app.use(logger('dev'))
app.use(cors())


// Parse JSON data in request body
router.use(express.json());

app.listen(3000,()=>{
    console.log('server started')
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

mongoose.connect("mongodb+srv://ambilibabu1998:cPtzvLXR04WPV3Mn@cluster0.4orxjb0.mongodb.net/EmployeeDetails?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
  console.log("DB is connected")
})
.catch(()=>{
  console.log("Error!! DB is not connected!!")
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


// Dummy employee data
const employees = [
    {
      id:1,
      name: "John Doe",
      position: "Software Engineer",
      location:"TVM",
      salary:400000
    },
    {
      id:2,
      name: "Jane Smith",
      position: "Product Manager",
      location:"Kochi",
      salary:500000
    },
    // ...
  ];
  
  // GET endpoint to return employee list
  app.get("/api/employeelist", (req, res) => {
    // Send the employee data as a response
    res.json(employees);
  });
  
  // Error handling middleware for 404 errors
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  // Error handling middleware for all other errors
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });




//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (err) {
      console.log(`Error retrieving employees: ${err.message}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    
    // Find the employee with matching ID in the database
    const employee = employees.find(e => e.id === id);
  
    // If the employee was found, return the employee data as a response
    // Otherwise, return a 404 error
    if (employee) {
      res.json(employees);
    } else {
      const error = new Error("Employee not found");
      error.status = 404;
      next(error);
    }
  });
  
  // Error handling middleware for 404 errors
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  // Error handling middleware for all other errors
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  





//TODO: send data from db using api '/api/employeelist'
// app.post('/read', (req,res)=>{
//     var data = new Employee(req.body)
//     data.save()
//     res.json({status : "Success"})
// })
router.get('/employeelist', (req, res) => {
    const db = client.db('EmployeeDetails');
    const collection = db.collection('employees');
  
    collection.find({}).toArray((err, employees) => {
      if (err) {
        console.error('Error fetching employees', err);
        res.status(500).send('Error fetching employees');
      } else {
        res.status(200).send(employees);
      }
    });
  });
  


//Request body format:{name:'',location:'',position:'',salary:''}


router.post('/employeelist', (req, res) => {
    const { name, location, position, salary } = req.body;
  
    // TODO: Add code to insert new employee data into database
  
    res.status(200).send('Employee added successfully');
  });



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

router.delete('/employeelist/:id', (req, res) => {
    const { id } = req.params;
    const db = client.db('EmployeeDetails');
    const collection = db.collection('employees');
  
    collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) {
        console.error('Error deleting employee', err);
        res.status(500).send('Error deleting employee');
      } else {
        res.status(200).send('Employee deleted successfully');
      }
    });
  });
  




//TODO: Update  a employee data from db by using api '/api/employeelist'

router.put('/employeelist/:id', (req, res) => {
    const { id } = req.params;
    const db = client.db('EmployeeDetails');
    const collection = db.collection('employees');
  
    const { name, location, position, salary } = req.body;
  
    collection.updateOne(
      { _id: ObjectId(id) },
      { $set: { name, location, position, salary } },
      (err, result) => {
        if (err) {
          console.error('Error updating employee', err);
          res.status(500).send('Error updating employee');
        } else {
          res.status(200).send('Employee updated successfully');
        }
      }
    );
  });
  
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
 app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
 });



