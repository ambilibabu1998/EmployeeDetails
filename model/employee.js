const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  id:Number,
  name: String,
  position: String,
  Location: String,
  Salary:Number

});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = {Employee};