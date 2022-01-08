import mongoose from 'mongoose'


const pokemon_schema = new mongoose.Schema(
    {
        name: String,
        description: String,
        imageSrc: String,
        types: [{name: String}],
        abilities: [{name: String}],
        weight: Number,
        height: Number
    }
);


const user_schema = new mongoose.Schema(
    {
        login: String,
        password: String,
    }
);

const team_schema = new mongoose.Schema(
    {
        user: String,
        pokemon: [{element: pokemon_schema }]
    }
);


const Pokemon = mongoose.model("Pokemon", pokemon_schema);
const Team = mongoose.model("Team", team_schema);
const User = mongoose.model("User", user_schema);

export {Pokemon, Team, User};