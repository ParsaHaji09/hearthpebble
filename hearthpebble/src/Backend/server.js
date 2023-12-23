const express = require('express')
const dotenv = require('dotenv');
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger')
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const {logEvents} = require ('./middleware/logger')
dotenv.config({ path: path.resolve(__dirname, '.env') });


var environment = process.env.NODE_ENV;
console.log(environment)

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(logger)
app.use(express.static('public'));

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

app.all('*', (req, res) =>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, "..", "..", 'public', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    } else{
        response.type('txt').send('404 Not Found')
    }
})
mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})