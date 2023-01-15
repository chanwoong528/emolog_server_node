const express = require('express')
const {
  createDiary,
  getAllDiariesByAccToken,
} = require('../Service/diaryService')
const router = new express.Router()

router.post('/', (req, res) => {
  createDiary(req, res)
})

//get all of the diary according to user
router.get('/all', (req, res) => {
  getAllDiariesByAccToken(req, res)
})

module.exports = router
