// destructure and bring projects and clients to work with
const {projects, clients} = require('../sampleData.js')
// destructure graphql to bring specific graphql functions/properties
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')


// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString}
  }) 
})

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  }) 
})

//Root Query - 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // query to get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      }
    },
    // query to get client by id
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // here we would have mongoose function to get a single client
        return clients.find((client) => client.id === args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})