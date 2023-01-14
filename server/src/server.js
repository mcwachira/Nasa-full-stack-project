const http = require('http')
const app = require('./app')



const { loadPlanetsData } = require('./models/planets.model')
const server = http.createServer(app)

const PORT = process.env.PORT || 8000;


const loadAppData = async () => {
    await loadPlanetsData()
}
server.listen(PORT, (req, res) => {
    console.log(`server running on port ${PORT}`)
})

loadAppData()