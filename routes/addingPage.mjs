import {Pokemon, Team} from "../model/models.mjs";
import express from "express";
const router = express.Router()


/* get all pokemon for adding page (not really useful)*/
router.get("/pokemons", async (req, res) => {
    Pokemon.find()
        .then((pokemons) => res.json(pokemons))
        .catch(() => res.status(404).end())
})



/* add pokemon to the user's team */
router.patch("/team/add/:userId/:pokemonId", async (req, res) => {

    // get the user's team
    Team.findOne({user: req.params.userId})
        .then((team) => {

            // max 6 pokemons per teams
            if(team.pokemon.length < 6) {
                //get the pokemon to add
                Pokemon.findById(req.params.pokemonId)
                    .then((pokemon) => {
                        //add pokemon to the team
                        team.pokemon.push(pokemon);
                        //and finally save the team
                        team.save();

                        res.json(team);
                    })
                    .catch(() => res.status(404).end());
            }
            else {
                res.status(403).json({message: 'Sorry, your team is already completed'})
            }

        })
        .catch(() => res.status(404).end());

})

export {router as ADDING_ROUTE}