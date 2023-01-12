const express = require("express");
const { createUser, findOneUserByEmail } = require("../Service/userService");


const router = new express.Router();


router.get("/", (req, res) => {
    console.log("######", req.query)
    findOneUserByEmail(req, res);
})


router.post("/", (req, res) => {

})





module.exports = router;