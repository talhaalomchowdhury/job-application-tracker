const db = require('../db')
const User = require('./User')
const Application = require('./Application')
const Interview = require('./Interview')

User.hasMany(Application, { foreignKey: 'userId', onDelete: 'CASCADE' })
Application.belongsTo(User, { foreignKey: 'userId' })

Application.hasMany(Interview, { foreignKey: 'applicationId', onDelete: 'CASCADE' })
Interview.belongsTo(Application, { foreignKey: 'applicationId' })

module.exports = {db,User,Application,Interview,}