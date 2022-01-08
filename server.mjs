import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import request from "request";

import {CONNEXION_ROUTE} from "./routes/connexionPage.mjs";
import {ADDING_ROUTE} from "./routes/addingPage.mjs";
import {TEAM_ROUTE} from "./routes/teamPAge.mjs";
import {INFORMATION_ROUTE} from "./routes/informationPage.mjs";
import {Pokemon, Team, User} from "./model/models.mjs";


const app = express()
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/pokemon-project").then(r => console.log(r))

/* ¬¬¬¬¬ INIT DB ¬¬¬¬¬ get pokemon insert in mongoDB */

function addPokemon(i) {
    request("https://pokeapi.co/api/v2/pokemon/"+i, function(err, res, body) {
        if (err) {
            throw err;
        }

        const data = JSON.parse(body);
        /* create pokemon and save it */
        const pokemon_to_add = new Pokemon({
            name: data.name,
            description: "No data in this APi, but it's ok I'm cool ... I hope",
            imageSrc: data.sprites.front_default,
            types: [{name: data.types[0].type.name}],
            abilities: [{name: data.abilities[0].ability.name}],
            weight: data.weight,
            height: data.height
        });

        pokemon_to_add.save();

        if( i < 50 ) addPokemon(i+1);
    });
}


Pokemon.find().then((body) => {

    /* If there are not data */

    if(body.length <= 0) {

        /* insert 50 pokemons get from an external API */

        addPokemon(1);

        /* create User */

        const user_to_add = new User({
            login: "Sid",
            password: "L'incroyable"
        });
        user_to_add.save();

        /* create Team */
        const team_to_add = new Team({
            user: user_to_add._id,
            pokemons: []
        });
        team_to_add.save();

    }

});


/* use ROUTES */

app.use(CONNEXION_ROUTE)
app.use(INFORMATION_ROUTE)
app.use(TEAM_ROUTE)
app.use(ADDING_ROUTE)


app.listen(5000, function () {
    console.log("Server reading")
})