const express = require('express')
const {
  createUser,
  findOneUserByEmailLoginType,
  findOneUserByAcc,
} = require('../Service/userService')

const router = new express.Router()

router.get('/', (req, res) => {
  console.log(findOneUserByEmailLoginType(req, res))
})

router.post('/', (req, res) => {
  createUser(req, res)
})

/**
 * @body refreshToken
 * @return accessToken
 */
router.post('/access-token', (req, res) => {})

router.post('/login', (req, res) => {
  findOneUserByAcc(req, res)
})

module.exports = router
