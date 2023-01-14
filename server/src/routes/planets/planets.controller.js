
const { getHabitablePlanets } = require('../../models/planets.model')

const httpGetAllPlanets = (req, res) => {

    console.log(getHabitablePlanets())
    return res.status(200).json(getHabitablePlanets())
}



module.exports = {
    httpGetAllPlanets
}