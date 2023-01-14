const launches = new Map();
const Launch = require('./launchesModel');
const Planets = require('./planetModel')
let DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer ISI',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-422b',
    customers: ['ztmn', 'Nasa'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch)




const launchExistWithId = async (launchId) => {
    return await Launch.findOne({
        flightNumber: launchId
    })
}
const getAllLaunches = async () => {
    return await Launch.find()
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

saveLaunch(launch)


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

    const aborted = await Launch.updateOne({

        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    }
    )

    return aborted.ok === 1 && aborted.nModified === 1;
}
module.exports = {
    getAllLaunches,
    launchExistWithId,
    scheduleNewLaunch,
    abortLaunchWithId
}