const { DataTypes } = require('sequelize')
const db = require('../db')

const Application = db.define('Application', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'applied',
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

module.exports = Application