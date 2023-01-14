
const { getAllLaunches, scheduleNewLaunch, launchExistWithId, abortLaunchWithId } = require('../../models/launches.model')

const httpGetAllLaunches = async (req, res) => {

    // console.log(launches)
    return res.status(200).json(await getAllLaunches())
}

const httpAddLaunchData = async (req, res) => {
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
    await scheduleNewLaunch(newLaunchDate)

    res.status(201).json(newLaunchDate)
}


const httpAbortLaunch = async (req, res) => {
    const launchId = Number(req.params.id)

    const existingId = launchExistWithId(launchId)
    if (!existingId) {
        return res.status(404).json({ error: 'NO id for the data present' })
    }

    const aborted = await abortLaunchWithId(launchId)

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunchData,
    httpAbortLaunch,
}