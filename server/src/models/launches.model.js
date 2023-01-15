
const axios = require('axios')
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


const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

const populateData = async () => {

    console.log('Downloading launch data ')
    const response = await axios.post(SPACEX_API_URL, {

        query: {},
        options: {
            "pagination": false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }



    })
    if (response.status !== 200) {

        console.log('Problem downloading launch data')
        throw new Error('Launch data downloaded failed')
    }

    const launchDocs = response.data.docs

    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload) => {
            return payload['customers']
        })


        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        }
        console.log(`${launch.flightNumber}`)

        await saveLaunch(launch)
    }

}


const loadLaunchData = async () => {


    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })

    if (firstLaunch) {
        console.log('Launch data already loaded')

    } else {
        populateData()
    }

}
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
    //this is where we need to to check the planet target fo our launch

    const planet = await Planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error('No matching planet found')
    }

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





const saveLaunch = async (launch) => {


    await Launch.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

const findLaunch = async (filter) => {
    return await Launch.findOne(filter)
}

const launchExistWithId = async (launchId) => {
    return await findLaunch({
        flightNumber: launchId
    })
}
const getAllLaunches = async () => {
    return await Launch.find()
}
// saveLaunch(launch)

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
    abortLaunchWithId,
    loadLaunchData
}