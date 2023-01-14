const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches ', () => {
    test('It should respond with a 200 success', async () => {
        const response = await request(app)
            .get('/launches/get')
            .expect('Content-Type', /json/)
            .expect(200)
    })


})

describe('Test POST /launches ', () => {

    const completedLaunchData = {
        mission: "Kepler Exploration Y",
        rocket: "Space X space Voyage",
        launchDate: "January,17 2023",
        target: "Kepler-422c"
    }

    const LaunchDataWithoutDate = {
        mission: "Kepler Exploration Y",
        rocket: "Space X space Voyage",
        target: "Kepler-422c"
    }

    const LaunchDataBadDate = {
        mission: "Kepler Exploration Y",
        rocket: "Space X space Voyage",
        target: "Kepler-422c",
        launchDate: "1",
    }


    test('It should respond with a 201 created', async () => {
        const response = await request(app)
            .post('/launches/add')
            .send(completedLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)


        const requestDate = new Date(completedLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)
        expect(response.body).toMatchObject(LaunchDataWithoutDate)
    })



    test('it should catch a missing required properties', async () => {

        const response = await request(app)
            .post('/launches/add')
            .send(LaunchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'please add all the fields'
        })


    })
    test('it should catch invalid dates', async () => {

        const response = await request(app)
            .post('/launches/add')
            .send(LaunchDataBadDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'date invalid format '
        })

    })

})