const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {name, email, password, address} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`
            INSERT INTO Users (name, email, password, address, role)
            VALUES (?, ?, ?, ?, 'user')`,
            [name, email, hashedPassword, address],
            function (err) {
                if (err) {
                    return res.status(400).json({message: "Email already exists"});
                }
                res.status(201).json({message: "User registered successfully"});
            }
        )
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
}

exports.login = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    db.get(
        `SELECT * FROM Users WHERE email = ?`,
        [email],
        async (err, user) => {
            if (err || !user) {
                return res.status(401).json({message: "Invalid credentials"});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(401).json({message: "Invalid credentials"});
            }

            const token = jwt.sign(
                {id: user.id, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: "1d"}
            );
            res.json({
                token, role: user.role,
            })
        }
    )
}