require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = process.env.BCRYPT_SALT_ROUND
const hashText = process.env.BCRYPT_HASH_TEXT
const compareText = process.env.BCRYPT_COMPARE_TEXT
const jwtSecret = process.env.JWT_SECRET

const db = require('../Model')
const User = db.user
const Op = db.Sequelize.Op
const { generateTokens } = require('../util/keyGenerator')

exports.createUser = (req, res) => {
  const hashedPw = bcrypt.hash(hashText, parseInt(saltRounds), function (
    err,
    hash,
  ) {
    if (err) {
      console.log(err)
      throw new Error('createUser[error](bcrypt): ', err)
    } else {
      const user = {
        name: req.body.name,
        email: req.body.email,
        pw: hash,
        login_type: req.body.login_type,
        platform: req.body.platform,
      }

      User.create(user).then((userData) => {
        return res.status(201).send({
          message: 'new user created',
          code: 201,
          data: generateTokens(userData),
          userInfo: {
            userId: userData.user_id,
            name: userData.name,
            email: userData.email,
            loginType: userData.login_type,
            platform: userData.platform,
            verified: userData.verified,
            active: userData.active,
          },
        })
      })
    }
  })
}

exports.findOneUserByAcc = (req, res) => {
  try {
    let decodedAcc = jwt.verify(req.body.accessToken, jwtSecret)

    if (decodedAcc.data) {
      User.findOne({ where: { user_id: decodedAcc.data } }).then((userData) => {
        return res.status(200).send({
          message: 'make user login with Access token',
          code: 200,
          data: generateTokens(userData),
          userInfo: {
            userId: userData.user_id,
            name: userData.name,
            email: userData.email,
            loginType: userData.login_type,
            platform: userData.platform,
            verified: userData.verified,
            active: userData.active,
          },
        })
      })
    }
  } catch (error) {
    if (error.message === 'jwt expired') {
      let decodedRef = jwt.verify(req.body.refreshToken, jwtSecret)
      User.findOne({ where: { user_id: decodedRef.data } }).then((userData) => {
        return res.status(200).send({
          message: 'make user login with Access token',
          code: 200,
          data: generateTokens(userData),
          userInfo: {
            userId: userData.user_id,
            name: userData.name,
            email: userData.email,
            loginType: userData.login_type,
            platform: userData.platform,
            verified: userData.verified,
            active: userData.active,
          },
        })
      })
    }
  }
}

exports.findOneUserByEmailLoginType = (req, res) => {
  const reqUserInfo = {
    email: req.query.email,
    login_type: req.query.login_type,
  }
  User.findOne({
    where: { email: reqUserInfo.email, login_type: reqUserInfo.login_type },
  }).then((userData) => {
    if (userData) {
      return res.status(200).send({
        message: 'user exist login',
        code: 200,
        data: generateTokens(userData),
        userInfo: {
          userId: userData.user_id,
          name: userData.name,
          email: userData.email,
          loginType: userData.login_type,
          platform: userData.platform,
          verified: userData.verified,
          active: userData.active,
        },
      })
    } else {
      return res
        .status(200)
        .send({ message: 'No user exist in Our DB', code: 404 })
    }
  })
}

exports.newAccessTokenFromRefreshToken = (req, res) => {
  try {
    let decodedRef = jwt.verify(req.body.refreshToken, jwtSecret)
    User.findOne({ where: { user_id: decodedRef.data } }).then((userData) => {
      if (userData) {
        return res.status(200).send({
          message: 'user exist login',
          code: 200,
          data: generateTokens(userData),
        })
      }
    })
  } catch (error) {
    return res
      .status(403)
      .send({ message: 'Refresh Token validation failed. Please Login again' })
  }
}
