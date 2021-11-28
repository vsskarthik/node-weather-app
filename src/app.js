const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const public_dir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// HBS relates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static content
app.use(express.static(public_dir))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Karthik"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Karthik"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Help content",
        name: "Karthik"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, lon, (error, { temp, feels_like } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location,
                temp,
                feels_like
            })
        })

    })
})

// app.get("/products", (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term"
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render("404ErrorPage", {
        title: "404 Error",
        errorMessage: "Help article not found",
        name: "Karthik"
    })
})
app.get('*', (req, res) => {
    res.render("404ErrorPage", {
        title: "404 Error",
        errorMessage: "Page not found",
        name: "Karthik"
    })

})
app.listen(port, () => {
    console.log("Server up on "+port)
})