var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require('../model/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// Register
router.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            {user_id: user._id, email},
            "PRIVATE_KEY_LOL",
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, email},
                "PRIVATE_KEY_LOL",
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
