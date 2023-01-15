const launches = new Map();
const Launch = require('./launchesModel');
const Planets = require('./planetModel')
let DEFAULT_FLIGHT_NUMBER = 100






const launchExistWithId = (launchId) => {
    return launches.has(launchId)
}
const getAllLaunches = async (skip, limit) => {
    return await Launch.find({}, { '_id': 0, '_v': 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit)
}

const saveLaunch = async (launch) => {

    const planet = await Planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error('No matching planet found')
    }
    await Launch.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

// saveLaunch(launch)


const getLatestFightNumber = async () => {
    const latestLaunch = await Launch
        .findOne()
        //sort in descending order
        .sort('-flightNumber')


    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}


const scheduleNewLaunch = async (launch) => {

    const newFlightNumber = await getLatestFightNumber() + 1;

    //object.assign will add new properties  to existing object
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ztm', 'Nasa'],
        flightNumber: newFlightNumber
    })


    await saveLaunch(newLaunch)
}

// const addNewLaunch = (launch) => {
//     DEFAULT_FLIGHT_NUMBER++
//     //object assign enables us to add new properties to our data
//     launches.set(DEFAULT_FLIGHT_NUMBER, Object.assign(launch, {
//         customers: ['ztm', 'Nasa'],
//         upcoming: true,
//         success: true,
//         flightNumber: DEFAULT_FLIGHT_NUMBER
//     }))
// }


// const abortLaunchWithId = (launchId) => {
//     const aborted = launches.get(launchId)
//     aborted.upcoming = false;
//     aborted.success = false

//     return aborted

// }

const abortLaunchWithId = async (launchId) => {

    const aborted = await Launch.findByIdAndDelete(launchId)

    return aborted
}

module.exports = {
    getAllLaunches,
    launchExistWithId,
    scheduleNewLaunch,
    abortLaunchWithId
}