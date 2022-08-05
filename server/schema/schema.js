// destructure and bring projects and clients to work with
const {projects, clients} = require('../sampleData.js')
// destructure graphql to bring specific graphql functions/properties
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')


// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    client: {
      type: ClientType,
      resolve(parent, args) {
        // find the client id which equals the parents (project) client id. - If you look in sampla data, each project has a clientid which refers to the id of the owner of the project.
        return clients.find(client => client.id === parent.clientId)
      }
    }
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
    // query to get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      }
    },
    // query to get project by id
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // here we would have mongoose function to get a single client
        return projects.find((project) => project.id === args.id)
      }
    },
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