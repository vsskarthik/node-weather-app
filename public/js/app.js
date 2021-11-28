const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const title = document.querySelector("h2")
const content = document.querySelector("h3")

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    title.innerHTML = "Loading..."
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                title.innerHTML = data.error
                content.innerHTML = ""
            } else {
                title.innerHTML = data.location
                content.innerHTML = `Temprature: ${data.temp} \xB0C <br><br>Feels Like: ${data.feels_like} \xB0C`
            }
        })
    })


})