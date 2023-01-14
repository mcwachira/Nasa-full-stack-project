const mongoose = require('mongoose')
const Mongo_Uri = process.env.Mongo_Uri || 'mongodb+srv://mcwachira:nokia100@cluster0.pniqqa2.mongodb.net/?retryWrites=true&w=majority'




mongoose.connection.once('open', () => {
    console.log('MongoDb connection ready')
})

mongoose.connection.on('error', (error) => {
    console.error(error)
})



const connectDb = async () => {
    try {
        const connect = await mongoose.connect(Mongo_Uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'Nasa_Api',
        })

        console.log(`MongoDb  connected `)
    } catch (error) {
        console.log(`error :${error.messages}`)
        process.exit(1)
    }


}


const disconnectDb = async () => {
    await mongoose.disconnect()
}

module.exports = {
    connectDb,
    disconnectDb,
}