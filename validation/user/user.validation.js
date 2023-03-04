const {user, student} = require('./user.schema');

module.exports ={
   addUserValidation: (req,res,next) =>{
      const value = student.validate(req.body,{abortEarly: false});
      if(value.error){
         res.status(401).send({message:"name length must be at least 3 characters long/ email must be a valid email/ date must be a valid date/ password fails to match the required pattern: ^[a-zA-Z0-9]{3,30}"})
      } else{
         next()
      }
   }
}

