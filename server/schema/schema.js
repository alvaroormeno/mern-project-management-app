// destructure and bring projects and clients to work with
const {projects, clients} = require('../sampleData.js')
// destructure graphql to bring specific graphql functions/properties
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema} = require('graphql')

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  })
}),

//Root Query - to query a client by their id
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // here we would have mongoose function to get a single client
        return clients.find(client => client.id === args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})