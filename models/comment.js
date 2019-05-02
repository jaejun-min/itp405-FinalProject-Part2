const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('comment', {
  id: {
    field: 'comment_id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    field: 'title',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'title is required'
      },
      len:{
        args:[2,40],
        msg:'Minimum 2 characters Max 40 required in title'
      }
    }
  },
  content:{
    field: 'content',
    type:Sequelize.STRING,
    validate:{
      notEmpty: {
        args: true,
        msg: 'content is required'
      },
      len:{
        args:[5],
        msg:'Minimum 5 characters required in content'
      }
    }
  }
}, {
  timestamps: false
});
