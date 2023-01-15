const { parse } = require('csv-parse')
const fs = require('fs')
const path = require('path')


const Planets = require('./planetModel')
const isHabitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

//asynchronously

/*
const promise = new Promise((resolve, reject) => {
    resolve(42)
})
promise.then((result) => {

})
const result = await promise
console.log(result)
*/




//saves data to our db

const saveHabitablePlanets = async (planet) => {
    try {
        await Planets.updateOne({
            //new data
            keplerName: planet.kepler_name
        }, {
            //update data
            keplerName: planet.kepler_name
        }, {
            //prevent duplication of data
            upsert: true
        })
    } catch (error) {
        console.error(`could not save planet ${error}`)
    }

}


//turn this into a promise to  wait for data to reload
const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "data", 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (isHabitable(data)) {
                    //insert + update = upset
                    saveHabitablePlanets(data)
                    // habitablePlanets.push(data)
                }


                // habitablePlanets.push(data)
            })
            .on('error', (error) => {

                console.log(error)
                reject(error)
            })
            .on('end', async () => {
                const countPlanetsFound = (await getHabitablePlanets()).length;
                //const countPlanetsFound = Planets.countDocuments({})
                console.log(countPlanetsFound)

                console.log(`${countPlanetsFound} is the number of planets that may have life`)
                console.log('done')
                resolve()
            })

    })
}

// parse()

const getHabitablePlanets = async () => {
    return await Planets.find({}, {
        '_id': 0, '__v': 0,
    });
}



module.exports = {
    loadPlanetsData,
    getHabitablePlanets
}