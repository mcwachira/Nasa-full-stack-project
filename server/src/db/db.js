require('dotenv').config()

const mongoose = require('mongoose')
    ;




mongoose.connection.once('open', () => {
    console.log('MongoDb connection ready')
})

mongoose.connection.on('error', (error) => {
    console.error(error)
})



const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: false,
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