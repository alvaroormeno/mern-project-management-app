const express = require('express')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

const port = process.env.PORT || 5001

const app = express();

app.use('/graphql', graphqlHTTP({
    // Require schema
    schema,
    // set to true only when in development
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))