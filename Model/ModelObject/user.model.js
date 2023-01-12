
module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: Sequelize.STRING,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
        },
        pw: {
            type: Sequelize.STRING,
            required: true,
        },
        pw_2nd: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        login_type: {
            type: Sequelize.STRING,
            required: true,
        },
        platform: {
            type: Sequelize.STRING,
            required: true,
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        forgot_pw: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        fcm_token: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true,

        },
        push_agree_yn: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        marketing_agree_yn: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return user
};