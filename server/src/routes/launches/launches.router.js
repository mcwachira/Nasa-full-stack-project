const express = require('express')

const { httpGetAllLaunches, httpAddLaunchData, httpAbortLaunch } = require('./launches.controller')
const router = express.Router()


//get launches
router.get('/get', httpGetAllLaunches)

//add launch data
router.post('/add', httpAddLaunchData)


//delete launch data
router.delete('/delete/:id', httpAbortLaunch)
module.exports = router