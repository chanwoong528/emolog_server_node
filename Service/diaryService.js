require('dotenv').config()

const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const db = require('../Model')
const User = db.user
const Diary = db.diary
const Op = db.Sequelize.Op

exports.createDiary = (req, res) => {
  const singleDiary = {
    calendar_date: req.body.calendar_date,
    diary_title: req.body.diary_title,
    diary_content: req.body.diary_content,
    author_id: req.body.author_id,
    diary_emotion: req.body.diary_emotion,
  }
  Diary.create(singleDiary)
    .then((diaryData) => {
      return res.status(201).send({
        message: 'Diary Created',
        code: 201,
        data: {
          diary_id: diaryData.diary_id,
          diary_emotion: diaryData.diary_emotion,
          calendar_date: diaryData.calendar_date,
        },
      })
    })
    .catch((err) => {
      //TODO:
      console.log(err)
    })
}
exports.getAllDiariesByAccToken = (req, res) => {
  const accessToken = req.headers['authorization'].split('Bearer ')[1]
  let decodedAcc = jwt.verify(accessToken, jwtSecret)
  console.log(decodedAcc)
  if (decodedAcc.data) {
    Diary.findAll({
      attributes: ['diary_id', 'diary_emotion', 'calendar_date'],
      where: { author_id: decodedAcc.data },
    }).then((allDiaries) => {
      console.log(allDiaries)
      return res
        .status(200)
        .send({ code: 200, message: 'Got all Diaries', data: allDiaries })
    })
  }
}
exports.getSingleDiaryByAccAndId = (req, res) => {
  // console.log(req.query)
  const accessToken = req.headers['authorization'].split('Bearer ')[1]
  let decodedAcc = jwt.verify(accessToken, jwtSecret)
  if (decodedAcc.data) {
    Diary.findOne({
      where: {
        diary_id: req.params.id,
      },
    }).then((singleDiary) => {
      console.log(singleDiary)
    })
  }
}
