
const { getAllLaunches, addNewLaunch, launchExistWithId, abortLaunchWithId } = require('../../models/launches.model')

const httpGetAllLaunches = (req, res) => {

    // console.log(launches)
    return res.status(200).json(getAllLaunches())
}

const httpAddLaunchData = (req, res) => {
    let { mission, rocket, launchDate, target } = req.body


    if (!mission || !rocket || !launchDate || !target) {
        return res.status(400).json({ error: 'please add all the fields' })
    }

    //if(isNaN(launchDate))
    launchDate = new Date(launchDate);
    if (launchDate.toString() === 'invalid date') {
        return res.status(400).json({ error: 'date invalid format ' })
    }
    const newLaunchDate = {
        mission,
        rocket,
        launchDate,
        target
    }

    // console.log(launches)
    addNewLaunch(newLaunchDate)

    res.status(201).json(newLaunchDate)
}


const httpAbortLaunch = (req, res) => {
    const launchId = Number(req.params.id)

    if (!launchExistWithId(launchId)) {
        return res.status(404).json({ error: 'NO id for the data present' })
    }

    const aborted = abortLaunchWithId(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunchData,
    httpAbortLaunch,
}