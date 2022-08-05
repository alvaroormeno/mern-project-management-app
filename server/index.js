const express = require('express')
const colors = require('colors')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db.js')

const port = process.env.PORT || 5001

const app = express();

// Connect to database via ConnectDB() function imported from db.js file
connectDB();

app.use('/graphql', graphqlHTTP({
    // Require schema
    schema,
    // set to true only when in development
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))