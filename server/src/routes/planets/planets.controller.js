
const { getHabitablePlanets } = require('../../models/planets.model')

const httpGetAllPlanets = async (req, res) => {

    console.log('planet data starts here')
    console.log(await getHabitablePlanets())
    return res.status(200).json(await getHabitablePlanets())
}



module.exports = {
    httpGetAllPlanets
}