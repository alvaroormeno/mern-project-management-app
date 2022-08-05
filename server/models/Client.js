const mongoose = require('mongoose')

// Important! - mongoose schema is not related to graphql schema. Ex. First comes mongo database, on top we have mongoose layer where we create schemas that includes fields for our db collections, on top we have the GraphQl api where our graphql schemas come in.
const ClientSchema = new mongoose.Schema({
  // object of fields that we want for schema
  name:{
    type: String,
  }, 
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

// Export as mongoose model (name, schema)
module.exports = mongoose.model('Client', ClientSchema) 