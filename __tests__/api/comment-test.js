const frisby = require('frisby');
const{Joi} = frisby;
// const Joi = frisby.Joi;
it('should return a status of 200 when the comment is found',()=>{
  return frisby
    .get('http://localhost:8000/api/comments/1')
    .expect('status', 200);
});

it('should return a status of 404 when the track does not exist',()=>{
  return frisby
    .get('http://localhost:8000/api/comments/-1')
    .expect('status', 404);
});

it('should return the comment title and its comments',()=>{
  return frisby
    .get('http://localhost:8000/api/comments/2')
    .expect('json','title', 'Second test')
    .expect('jsonTypes', 'student', {
      id: Joi.number().required(),
      name: Joi.string().required()
    });
});

it('should create an comment', ()=>{
  return frisby
    .post('http://localhost:8000/api/comments', {
      title: 'ITP405 post',
      content:'ITP405 post test content'
    })
    .expect('status', 200)
    .expect('json', 'title', 'ITP405 post')
    .expect('jsonTypes', 'id', Joi.number().required());
});

it('should return a status of 200 when the track is updated successfully',()=>{
  return frisby
    .patch('http://localhost:8000/api/comments/1',{
      title: 'Test api patch',
      content: "Hello test api comment test"
    })
    .expect('status', 200)
});
it('should return a status of 422 when the track has validation errors',()=>{
  return frisby
    .patch('http://localhost:8000/api/comments/5',{
      title: "",
      content: "a"
    })
    .expect('status', 422);
});

it('should return a 204 when deleting a comment that does  exist', ()=>{
  return frisby
    .del('http://localhost:8000/api/comments/1')
    .expect('status', 204);
});

it('should return a 404 when deleting a comments that not exists', ()=>{
  return frisby
    .del('http://localhost:8000/api/comments/-1')
    .expect('status', 404);
});
