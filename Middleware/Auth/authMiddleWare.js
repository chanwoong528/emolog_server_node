const jwt = require('jsonwebtoken')

function isValidAccessToken(req, res, next) {
  console.log(
    '!!!!!!!@@@@@@@@',
    req.headers['authorization'].split('Bearer ')[1],
  )
  const token = req.headers['authorization'].split('Bearer ')[1]
  if (!token) {
    console.log('!!')
    return res.status(401).send({ msg: 'No Token Containing' })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('!@#!@#!@#!@$!#$#!$#!$!#$#!$')
        if (err.name === 'TokenExpiredError') {
          console.log('여기')
          return res.status(401).send({ msg: 'accToken expired!' })
        } else {
          return res
            .status(403)
            .send({ isLoggedIn: false, msg: 'Failed To Verify User' })
        }
      } else {
        req.auth = decoded
        next()
      }
    })
  }
}

module.exports = {
  isValidAccessToken,
}
