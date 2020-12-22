import express from 'express';
import User from '../models/userModel.js';
import auth from '../middleware/auth.js'
const userRouter = express.Router();


userRouter.post('/create', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) {
        console.log("Test", e)
        res.status(400).send(e)
    }
})


userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(500).send();
    }
})

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

userRouter.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

userRouter.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

export default userRouter;