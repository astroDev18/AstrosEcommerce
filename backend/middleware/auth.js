import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'astrodev')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.sendStatus(401).send({error: 'Please authenticate.'})
    }
}

export default auth;