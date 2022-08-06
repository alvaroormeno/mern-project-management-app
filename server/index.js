const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db.js')
const path = require('path')

const port = process.env.PORT || 5001

const app = express();



// Connect to database via ConnectDB() function imported from db.js file
connectDB();

//middle wear
app.use(cors())

app.use('/graphql', graphqlHTTP({
    // Require schema
    schema,
    // set to true only when in development
    graphiql: process.env.NODE_ENV === 'development'
}))


// Pointing express to the static build files when we build our app for deployment
app.use(express.static('public'))

app.get("*"), (req, res) => {
    res.sendFile(path.resolve(__dirname, '../server/public', "index.html"))
}

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))