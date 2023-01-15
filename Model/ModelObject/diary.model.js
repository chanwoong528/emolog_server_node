module.exports = (sequelize, Sequelize) => {
  const diary = sequelize.define('diary', {
    diary_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    calendar_date: {
      type: Sequelize.STRING,
      required: true,
    },
    author_id: {
      type: Sequelize.UUID,
      required: true,
    },
    diary_emotion: {
      type: Sequelize.STRING,
      require: true,
    },
    diary_title: {
      type: Sequelize.STRING,
      required: true,
    },
    diary_content: {
      type: Sequelize.STRING,
      required: true,
    },
    dairy_pw: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  })

  return diary
}
