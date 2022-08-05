// destructure and bring projects and clients to work with
const {projects, clients} = require('../sampleData.js')
// destructure graphql to bring specific graphql functions/properties
const { GraphQLObjectType} = require('graphql')

// Client Type
const ClientType = new GraphQLObjectType({
name: 'Client',

}) 