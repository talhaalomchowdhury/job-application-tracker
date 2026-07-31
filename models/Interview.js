const { DataTypes } = require('sequelize')
const db = require('../db')

const Interview = db.define('Interview', {
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  interviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  interviewType: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

module.exports = Interview