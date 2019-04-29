const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('college', {
  id: {
    field: 'college_id',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    field: 'name',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
