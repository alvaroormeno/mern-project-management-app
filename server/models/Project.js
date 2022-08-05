const mongoose = require('mongoose')

// Important! - mongoose schema is not related to graphql schema. Ex. First comes mongo database, on top we have mongoose layer where we create schemas that includes fields for our db collections, on top we have the GraphQl api where our graphql schemas come in.
const ProjectSchema = new mongoose.Schema({
  // object of fields that we want for schema
  name:{
    type: String,
  }, 
  description: {
    type: String,
  },
  status: {
    type: String,
    // different values for status
    enum: ['Not Started', 'In Progress', 'Completed']
  },
  clientId: {
    // when we create a new record it will always get assigned an id
    type: mongoose.Schema.Types.ObjectId,
    // we want it to relate to Client model so this clientId should pertain to the id of the client model
    ref: 'Client',

  }
});

// Export as mongoose model (name, schema)
module.exports = mongoose.model('Project', ProjectSchema) 