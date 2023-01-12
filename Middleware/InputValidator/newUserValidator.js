const { body } = require("express-validator/check");



export const newUserValidator = [
    body("name").isLength({ min: 4, max: 20 }),
    body("email")
        .isEmail()
        .withMessage("Email format is not valid. Check Email format "), ,
    body("pw").isLength({ min: 8, max: 16 })
        .withMessage("password should be within 6~10 letters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/) //regex of (upper/lower/number/specialChar)
        .withMessage("password should include upper/lower/number/special char"),
    body("login_type").isLength({ min: 1 }),
    body("platform").isLength({ min: 1 }),

]


function NewUserValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errObj = errors.mapped(); //=> making it to be object {userName:''}

        return res.status(400).send({
            firstErr: errObj.firstName,
            lastErr: errObj.lastName,
            emailErr: errObj.email,
            pwErr: errObj.password,
            pwConErr: errObj.passwordConfirm,
        });
    }
    next();
}