const { parse } = require('csv-parse')
const fs = require('fs')
const path = require('path')
const habitablePlanets = []

const isHabitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
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

//turn this into a promise to  wait for data to reload

const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "data", 'kepler_data.csv')).pipe(parse({
            comment: '#',
            columns: true
        })).on('data', (data) => {
            if (isHabitable(data)) {
                habitablePlanets.push(data)
            }

            habitablePlanets.push(data)
        }).on('error', (error) => {

            console.log(error)
            reject(error)
        }).on('end', () => {
            console.log(`${habitablePlanets.length} is the number of planets that may have life`)
            console.log('done')
            resolve()
        })

    })
}

// parse()

const getHabitablePlanets = () => {

    return habitablePlanets
}

module.exports = {
    loadPlanetsData,
    getHabitablePlanets
}