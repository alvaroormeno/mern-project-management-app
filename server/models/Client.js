const mongoose = require('mongoose')

// Important! - mongoose schema is not related to graphql schema. Ex. First comes mongo database, on top we have mongoose layer where we create schemas that includes fields for our db collections, on top we have the GraphQl api where our graphql schemas come in. test