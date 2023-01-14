const express = require('express')


const { httpGetAllPlanets } = require('./planets.controller')
const router = express.Router()


//get planets
router.get('/get', httpGetAllPlanets)


module.exports = router