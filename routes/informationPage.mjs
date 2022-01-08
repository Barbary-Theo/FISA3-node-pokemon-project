import {Pokemon} from "../model/models.mjs";
import express from "express";
const router = express.Router()


/* get pokemon by his id */
router.get("/pokemon/:pokemonId", async (req, res) => {
    Pokemon.findById(req.params.pokemonId)
        .then((pokemon) => {res.json(pokemon)})
        .catch(() => res.status(404).end());
})


export {router as INFORMATION_ROUTE}