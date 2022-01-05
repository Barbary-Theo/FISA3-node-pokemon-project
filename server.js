const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/dishes-project").then(r => console.log(r))

const Kitten = mongoose.model("Kitten", { name: String })


app.get("/kittens", async (req, res) => {
    Kitten.find()
        .then((kittens) => res.json(kittens))
        .catch(() => res.status(404).end())
})


// TO BE COMPLETED...
app.listen(5000, function () {
    console.log("Server reading")
})