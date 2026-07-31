const { DataTypes } = require('sequelize')
const db = require('../db')

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

module.exports = User