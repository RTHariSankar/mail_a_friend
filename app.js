const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT;


const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

const sendEamil = require('./routes/route');
app.use('/',sendEamil);


app.listen(PORT,()=>{
    console.log(`Server is listening in port ${PORT}`)
});