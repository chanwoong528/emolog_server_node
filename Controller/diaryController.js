const express = require('express')
const { isValidAccessToken } = require('../Middleware/Auth/authMiddleWare')
const {
  createDiary,
  getAllDiariesByAccToken,
  getSingleDiaryByAccAndId,
  getLimitedNumberDiaries,
} = require('../Service/diaryService')
const router = new express.Router()

router.post('/', (req, res) => {
  createDiary(req, res)
})

//get all of the diary according to user
router.get('/all', (req, res) => {
  getAllDiariesByAccToken(req, res)
})
// router.get('/:id', (req, res) => {
//   getSingleDiaryByAccAndId(req, res)
// })
router.get('/limit', isValidAccessToken, (req, res) => {
  getLimitedNumberDiaries(req, res)
})
module.exports = router
