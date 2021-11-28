const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoidnNza2FydGhpazgiLCJhIjoiY2t3MmQyaG12ZHM1MTJ1czcwOTB3b3ZhaCJ9.soVo5nxRIW71z3eSpOAx7g"

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to location services", undefined)
        } else {
            if (body.message || body.features.length === 0) {
                callback("Cannot find the location. Please try another location.", undefined)
            } else {
                const lon = body.features[0].center[0]
                const lat = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, { lat, lon, location })
            }
        }
    })
}

module.exports = geocode