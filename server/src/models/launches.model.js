const launches = new Map();
let latestFlightNumber = 100

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



const launchExistWithId = (launchId) => {
    return launches.has(launchId)
}
const getAllLaunches = () => {
    return Array.from(launches.values())
}

const addNewLaunch = (launch) => {
    latestFlightNumber++
    //object assign enables us to add new properties to our data
    launches.set(latestFlightNumber, Object.assign(launch, {
        customers: ['ztm', 'Nasa'],
        upcoming: true,
        success: true,
        flightNumber: latestFlightNumber
    }))
}


const abortLaunchWithId = (launchId) => {
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success = false

    return aborted

}
module.exports = {
    getAllLaunches,
    addNewLaunch,
    launchExistWithId,
    abortLaunchWithId
}