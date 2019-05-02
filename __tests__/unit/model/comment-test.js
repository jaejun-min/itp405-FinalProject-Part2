const {expect} = require('chai');
const frisby = require('frisby');
const{Joi} = frisby;
const Comment = require('./../../../models/comment')

describe('comment',()=>{

  it('should be at leat 2 characters', async ()=>{
    try {
      let comment = new Comment({title: 'a'});
      await comment.validate();
    } catch (error) {
      expect(error.errors[0].message).to.equal('Minimum 2 characters Max 40 required in title');
    } finally {

    }
  });

  it('should be less than 10 characters', async ()=>{
    try {
      let comment = new Comment({title: 'abcdefghjklq'});
      await comment.validate();
    } catch (error) {
      expect(error.errors[0].message).to.equal('Minimum 2 characters Max 40 required in title');
    } finally {

    }
  });

  it('should be more than 5 characters', async ()=>{
    try {
      let comment = new Comment({content: 'qwe'});
      await comment.validate();
    } catch (error) {
      expect(error.errors[0].message).to.equal('Minimum 5 characters required in content');
    } finally {

    }
  });
});
