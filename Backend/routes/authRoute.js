import express from "express";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/User.js";
import findToken from "../middleware/findToken.js";

const router = express.Router();

router.post('/sigin', [
    body('name').isString().isEmpty().isLength(5).withMessage('Name Should Be Of minimum 5 char'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isString().isLength(5).withMessage('Password Should Be Of Minimum 5 char'),
    body('phone').isNumeric().isLength(10).isEmpty().withMessage('Number Should be 5 in Length'),
    body('age').isEmpty().isNumeric().withMessage('Age Should Not be Empty'),
    body('gender').isEmpty().isString().withMessage('Gender Should Not be Empty'),
    body('blood_group').isEmpty().isString().withMessage('Blood Group Should Not be Empty'),
    body('address').isEmpty().isString().withMessage('Address Should Not be Empty'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        let user = await User.findOne(req.email);
        if (!user) {
            return res.status(400).send({ error: 'User Already Exist' });
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phone: req.body.phone,
            age: req.body.age,
            gender: req.body.gender,
            blood_group: req.body.blood_group,
            address: req.body.address,
        });

        const data = {
            user: {
                userId: user.id,
            }
        };

        const SecreteKey = 'VivekIsCollegeStudent';
        const jwtToken = jwt.sign(data, SecreteKey);

        res.status(200).send({ jwtToken });
    } catch (error) {
        console.log('error ', error.message);
        return res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.post('/login', [
    body('name').isString().isEmpty().isLength(5).withMessage('Name Should be of 5 length long'),
    body('email').isEmail().withMessage('Email Is Not Valid'),
    body('password').isString().isEmpty().isLength(5).withMessage('Password Must Be Of Minimum 5 In Length'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        let user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(400).send({ error: 'User Does Not Exist' });
        }
        const Matched = await bcrypt.compare(req.body.password, user.password);
        if (!Matched) {
            return res.status(400).send({ error: 'Invalid Cridentials Provided' });
        }

        const data = {
            user: {
                userId: user.id,
            }
        };

        const SecreteKey = 'VivekIsCollegeStudent';
        const jwtToken = jwt.sign(data, SecreteKey);

        res.status(200).send({ jwtToken });
        console.log(jwtToken);

    } catch (error) {
        console.log('error ', error.message);
        return res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.get('/getUserInfo', findToken, async (req, res) => {
    try {
        const userId = await res.user;
        if(!userId){
            return res.status(400).send({error:'Internal Server Error'});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({error:'User Does Not Exist'});
        }
        res.status(200).send({user});
        
    } catch (error) {
        console.log('error ', error.message);
        return res.status(400).send({ error: 'Internal Error Occurred' });
    }
})

export default router;

