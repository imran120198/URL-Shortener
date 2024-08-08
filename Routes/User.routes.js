const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../Models/User.schema");

const UserRouter = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              username:
 *                  type: string
 *                  description: The username
 *              password:
 *                  type: string
 *                  description: The user password
 *
 */

// signup

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: To post the details of a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

UserRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await UserModel.findOne({ username });
    if (result) {
      res.status(400).send("Username Already Existed");
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(500).send("Something went wrong in signup");
        } else {
          const newSignup = new UserModel({
            username: username,
            password: hash,
          });
          const saveSignup = await newSignup.save();
          res.status(201).send({ message: "Signup Successfull", saveSignup });
        }
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// login

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

UserRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const hash = user.password;

    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Something wrong with login", err });
      }
      if (result) {
        const expiresIn = "1d";
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
          expiresIn,
        });
        res.status(201).send({ message: "Login Successful", token });
      } else {
        res.status(500).send({ message: "Invalid Credential" });
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = {
  UserRouter,
};
