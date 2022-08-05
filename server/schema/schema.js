// destructure and bring projects and clients to work with
// const {projects, clients} = require('../sampleData.js')
// destructure graphql to bring specific graphql functions/properties
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql')
// import mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');


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
        return clients.findById(parent.clientId)
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

//Root Query - to fetch data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // query to get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // find from Project mongoose schema
        return Project.find();
      }
    },
    // query to get project by id
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // here we would have mongoose function to get a single client
        return Project.findById(args.id)
      }
    },
    // query to get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // find from Client mongoose schema
        return Client.find();
      }
    },
    // query to get client by id
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // here we would have mongoose function to get a single client
        return Client.findById(args.id)
      }
    }
  }
});


// Mutations - queries to add or delete data
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      // args are fields we want to add
      args: {
        // we dont want someone to add a new client without a name so we use GraphQLNonNull to wrap around the type of GraphQLString
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // creating a new client using the mongoose Client model and passing properties/values (name, email, phone). The args will come from the graphql query
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        // return the client we just created and save it to the database
        return client.save()

      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})