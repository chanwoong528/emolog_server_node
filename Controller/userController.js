const express = require("express");
const { createUser, findOneUserByEmail, findOneUserByGoogleEmail } = require("../Service/userService");


const router = new express.Router();


router.get("/", (req, res) => {
    // console.log("######", req.query)
    findOneUserByGoogleEmail(req, res);
})


router.post("/", (req, res) => {
    createUser(req, res);
})





module.exports = router;