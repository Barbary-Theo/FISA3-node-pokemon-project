import {Team, User} from "../model/models.mjs";
import express from "express";
const router = express.Router()


/* get all users */
router.get("/users", async (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch(() => res.status(404).end())
})



/* get to login a user */
router.get("/user/login/:login/:password", async (req, res) => {

    User.findOne({login : req.params.login, password: req.params.password})
        .then((user) => {

            // if exist
            if(user) {
                res.json(user);
            }
            else {
                return res.status(403).json({message: 'Sorry, bad credentials'})
            }
        })

})



/* post to sign-in a new User */
router.post("/user/signIn/:login/:password", async (req, res) => {

    User.findOne({login : req.params.login, password: req.params.password})
        .then((user) => {

            // if not still exist
            if(!user) {
                // create and save new user
                const user_to_save = new User({login: req.params.login, password: req.params.password});

                user_to_save.save()
                    .then((user) => {
                        // create and save his team
                        const user_team_to_save = new Team({user: user._id});

                        user_team_to_save.save()
                            .then(res.json(user));
                    });
            }
            else {
                return res.status(403).json({message: 'Sorry, this user already exist'})
            }
        })

})


/* ------- delete user by his id ------- */
router.delete("/user/delete/:userId", async (req, res) => {

    // get the user's team and delete it
    Team.findOneAndDelete({user: req.params.userId})
        .then((team) => {

            // get the user and delete it
            User.findOneAndDelete({_id: req.params.userId})
                .then((user) => (res.json(user)))
                .catch(() => res.status(404).end());

        })
        .catch(() => res.status(404).end());

})

export {router as CONNEXION_ROUTE}