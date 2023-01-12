const db = require("../Model");
const User = db.user;
const Op = db.Sequelize.Op;

exports.createUser = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty!",
        });
    }
    const user = {
        email: req.body.email
    }
    User.findOne({ where: { email: user.email } }).then((userData) => {
        if (userData) {
            return res.status(400).send({
                message: "User exist!", type: "DUPLICATED", user_id: userData.user_id
            });
        } else {
            User.create(user)
                .then((userData) => {
                    return res.send(userData);
                });
        }
    })

}
exports.findOneUserByEmail = (req, res) => {



    const reqUserInfo = {
        email: req.query.email,
        login_type: req.query.login_type
    }
    User.findOne({ where: { email: reqUserInfo.email, login_type: reqUserInfo.login_type } }).then((userData) => {
        if (userData) {
            return res.status(200).send({ message: "user exist login", code: 200 })
        } else {
            return res.status(200).send({ message: "No user exist in Our DB", code: 404 })
        }

    })
}

