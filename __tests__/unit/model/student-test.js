const {expect} = require('chai');
const frisby = require('frisby');
const{Joi} = frisby;
const Student = require('./../../../models/student')

describe('comment',()=>{
  it('should only contain numbers', async ()=>{
        try {
          let student = new Student({grad: 'a'});
          await student.validate();
        } catch (error) {
          expect(error.errors[0].message).to.equal('Graduation year is not numeric');
        } finally {

        }
      });
  it('should only contain numbers', async ()=>{
    try {
      let student = new Student({grad: '1'});
      await student.validate();
      expect('jsonTypes', 'students',{
        grad: Joi.number().required()
      });
      expect("Graduation year is not numeric").to.equal('Graduation year is not numeric');
    } catch (error) {
      expect(error.errors[0].message).to.equal('Graduation year is not numeric');
    } finally {

    }
  });

    it('should be more than 5 characters', async ()=>{
      try {
        let comment = new Student({intro: 'qwe'});
        await comment.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Minimum 5 characters required in intro');
      } finally {

      }
    });

});
