require('dotenv').config()
const { Sequelize } = require('sequelize')

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize('postgres://postgres:root@localhost:5432/JobApplication')

module.exports = db