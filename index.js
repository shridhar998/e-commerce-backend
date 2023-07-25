const express = require('express')
const mongoose = require('mongoose')
const port = 3001
const dotenv =require('dotenv')
const app = express()
const productRouter = require('./routes/products');
dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected successfully")).catch((err)=>console.log(err))

var cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));

app.use('/api/products',productRouter);


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
