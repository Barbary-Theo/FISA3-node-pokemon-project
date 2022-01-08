import {Team,} from "../model/models.mjs";
import express from "express";
const router = express.Router()


/* get all teams (not really useful)  */
router.get("/teams", async (req, res) => {``
    Team.find()
        .then((teams) => res.json(teams))
        .catch(() => res.status(404).end())
})


/* get team by the userId, to get the user's connected team */
router.get("/team/:userId", async (req, res) => {
    Team.findOne({user: req.params.userId})
        .then((data) => {res.json(data)})
        .catch(() => res.status(404).end());
})



/* remove pokemon to the user's team */
router.patch("/team/remove/:userId/:pokemonId", async (req, res) => {

    // get the user's team
    Team.findOne({user: req.params.userId})
        .then((team) => {

            // search pokemon to remove
            for(let i = 0 ; i<team.pokemon.length ; i++) {
                // if correspond
                if(team.pokemon[i]._id == req.params.pokemonId) {
                    team.pokemon.splice(i, 1);
                }
            }

            team.save()
            res.json(team)

        })
        .catch(() => res.status(404).end());

})



/* remove all pokemon to the user's team */
router.patch("/team/removeAll/:userId", async (req, res) => {

    // get the user's team
    Team.findOne({user: req.params.userId})
        .then((team) => {
            // removeAll pokemon
            team.pokemon = []

            team.save()
            res.json(team)

        })
        .catch(() => res.status(404).end());

})

export {router as TEAM_ROUTE}