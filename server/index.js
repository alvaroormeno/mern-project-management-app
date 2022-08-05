const express = require('express')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')

const port = process.env.PORT || 5001

const app = express();

app.use('/graphql', graphqlHTTP({
    // Require schema
}))

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))