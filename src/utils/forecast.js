const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=70aae97ac6eaf4cd91cb036ade145b49&units=metric"

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback("Unable to connect to weather service", undefined)
        }
        else {

            if (body.message) {
                callback("Cannot process the information", undefined)
            }
            else {
                const {main: data} = body
                const {temp,feels_like} = data
                //console.log(response.body.weather[0].description + ". It is currently", data.temp, "degrees out. It feels like", data.feels_like, "degrees out")
                callback(undefined, { temp, feels_like })
            }
        }
    })
}

module.exports = forecast