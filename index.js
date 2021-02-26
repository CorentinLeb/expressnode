const express = require('express');
const bodyParser = require('body-parser')
const cors=require('cors');
const app=express();
const PORT = process.env.POST ||3000
const mongoose = require('mongoose')
require('dotenv/config');

// Import Route
const postsRoute = require('./routes/posts');
app.use('/api/v1/posts/', postsRoute)

app.use(cors())
// for express
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send(`<h1 class="title">Hello world</h1>`)
})

// connecting to mongoose
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true ,useUnifiedTopology: true},
    
    ()=>{
        return console.log('Connected to MongoDB')
    }
)

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})