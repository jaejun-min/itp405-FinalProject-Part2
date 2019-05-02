const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Student = require('./models/student');
const Comment = require('./models/comment');
const College = require('./models/college');
const Major = require('./models/major');
const { Op } = Sequelize;
const app = express();

app.use(bodyParser.json());

Student.belongsTo(College,{
  foreignKey: 'college_id'
});
College.hasMany(Student,{
  foreignKey: 'college_id'
});
Student.belongsTo(Major,{
  foreignKey: 'major_id'
});
Major.hasMany(Student,{
  foreignKey: 'major_id'
});
Student.hasMany(Comment,{
  foreignKey: 'student_id'
})
Comment.belongsTo(Student,{
  foreignKey: 'student_id'
});
Major.belongsToMany(College,{
  through: 'college_major',
  foreignKey: 'major_id',
  timestamps: false
});
College.belongsToMany(Major,{
  through: 'college_major',
  foreignKey: 'college_id',
  timestamps: false
});


app.delete('/api/comments/:id', function(request, response) {
  let { id } = request.params;

  Comment
    .findByPk(id)
    .then((comment) => {
      if (comment) {
          return comment.destroy();
      } else {
        return Promise.reject();
      }
    })
    .then(() => {
      response.status(204).send();
    }, () => {
      response.status(404).send();
    });
});

app.post('/api/comments', function(request, response) {
  Comment.create({
    title: request.body.title,
    content:request.body.content,
    student_id: 1,
  }).then((comment) => {
    response.json(comment);
  }, (validation) => {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  });
});
app.get('/api/comments', function(request, response) {
  let filter = {};
  let { q } = request.query;
  if (q) {
    filter = {
      where: {
        title: {
          [Op.like]: `${q}%`
        }
      }
    };
  }
  Comment.findAll(filter).then((comments) => {
    response.json(comments);
  });
});
app.patch('/api/comments/:id', function(request, response){
  let { id } = request.params;
  // console.log(id)

 Comment.findByPk(id).then((track)=>{
    if (track){
    }else{
      return Promise.reject();
    }
  }).then(()=>{
    Comment.update({
      title: request.body.title,
      content: request.body.content,
      student_id: request.body.student_id},
      {
        where:{ id : request.params.id }
    }).then(()=>{
        response.status(200).send();
    },(validation)=>{
        response.status(422).json({
          errors: validation.errors.map((error)=>{
            return {
              attribute:error.path,
              message: error.message
            }
          })
        })
    });
  },()=>{
      response.status(404).send();
  });
});

app.get('/api/comments/:id', function(request, response) {
  let { id } = request.params;

  Comment.findByPk(id, {
    include: [Student]
  }).then((comment) => {
    if (comment) {
      response.json(comment);
    } else {
      response.status(404).send();
    }
  });
});
app.get('/api/students/:id', function(request, response) {
  let { id } = request.params;

  Student.findByPk(id).then((comment) => {
    if (comment) {
      response.json(comment);
    } else {
      response.status(404).send();
    }
  });
});
app.get('/api/students', function(request, response) {
  let filter = {};
  let { q } = request.query;
  if (q) {
    filter = {
      where: {
        title: {
          [Op.like]: `${q}%`
        }
      }
    };
  }
  Student.findAll(filter).then((comments) => {
    response.json(comments);
  });
});



app.listen(8000);
