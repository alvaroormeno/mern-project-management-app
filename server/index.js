const express = require('express')
require('dotenv').config();

const port = process.env.PORT || 5001


const app = express();

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))