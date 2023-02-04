const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  date_of_retirement: { type: Date }
});



//Export model
module.exports = mongoose.model('testsubj', MachineSchema);

