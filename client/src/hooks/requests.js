const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.

  const response = await fetch(`${API_URL}/planets/get`)

  //you only can consume Response.json() once, if you are consuming it more than once, the error will happen.
  // console.log(await response.json())
  return await response.clone().json();

}

async function httpGetLaunches() {
  // TODO: Once API is ready.

  const response = await fetch(`${API_URL}/launches/get`)
  // Load launches, sort by flight number, and return as JSON.
  const sortedLaunches = await response.clone().json();
  return sortedLaunches.sort((a, b) => a.flightNumber - b.flightNumber)
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.

  try {
    return await fetch(`${API_URL}/launches/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch)
    })

  } catch (error) {
    return {
      ok: false
    }
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.

  try {
    return await fetch(`${API_URL}/launches/delete/${id}`, {
      method: "delete",

    })

  } catch (error) {
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};