const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const morgan = require('morgan')




//enabling cors
app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
))

//enables us to se logs in our terminal
app.use(morgan('combined'))



// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))

/*enabling express to locate static files*/
app.use(express.static('public'))

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '..', '/public')))

//imports our routers

const { api } = require('./routes/api')
// const planetsRouter = require('./routes/planets/planets.router')
// const launchesRouter = require('./routes/launches/launches.router')

// app.use('/planets', api.planetsRouter)

// app.use('/launches', api.launchesRouter)


app.use('/v1', api)
module.exports = app