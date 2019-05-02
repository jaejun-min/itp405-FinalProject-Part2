const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('student', {
  id: {
    field: 'student_id',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    field: 'name',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name is required'
      },
      isAlpha: {
        args: true,
        msg: 'Name must only contain letters'
      }
    }
  },
  grad:{
    field: 'grad_year',
    type:Sequelize.INTEGER,
    validate:{
      isNumeric:{
        args: true,
        msg: 'Graduation year is not numeric'
      }
    }
  },
  intro:{
    field: 'intro',
    type:Sequelize.STRING,
    validate:{
      notEmpty: {
        args: true,
        msg: 'intro is required'
      },
      isAlpha:{
        args: true,
        msg: 'intro must only contain letters'
      },
      len:{
        args:[5],
        msg:'Minimum 5 characters required in intro'
      }
    }
  }
}, {
  timestamps: false
});
