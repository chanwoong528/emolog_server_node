module.exports = (sequelize, Sequelize) => {
    const emotion = sequelize.define("emotion", {
        emotion_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        img_src: {
            type: Sequelize.STRING,
            required: true
        },
        emotion_title: {
            type: Sequelize.STRING,
            required: true
        },
        emotion_desc: {
            type: Sequelize.STRING,
            required: true,
        },
    });

    return emotion
};