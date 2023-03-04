const joi = require('@hapi/joi');


const schema = {
   student: joi.object({
      name: joi.string().min(3).max(100).required(),
      email: joi.string().email().lowercase().required(),
      age: joi.number().max(100).required(),
      dob: joi.date().required(),
      password: joi.string().min(3).max(18).pattern(new RegExp("^[a-zA-Z0-9]{3,30}")).required(),
   })
};

module.exports = schema;