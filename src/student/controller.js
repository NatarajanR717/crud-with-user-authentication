const pool = require('../../db');
const jwt = require('jsonwebtoken');
const queries = require('./quries');
const {hashGenerate} = require('./helpers/hashing');
const {hashValidator} = require('./helpers/hashing');






//Add students
const addStudent = async (req,res,next) =>{
   const {name, email, age, dob} = req.body;
   const password = await hashGenerate(req.body.password);
   //check if email exists
   await pool.query(queries.checkEmailExists,[email],(error,results) =>{
      if (results.rows.length){
         res.status(403).send("email already exists")}
         else{
             //Add a student form db
      pool.query(
         queries.addStudent,[name,email,age,dob,password],(error,results) =>{
            if(error) throw error
            res.status(201).send("Student created successfully!!!")
         }
      );
         }
   });
};

//Delete Student
const removeStudent =async (req,res) =>{
   const id = parseInt(req.params.id);

   await pool.query(queries.getStudentsById,[id],(error,results) =>{
      const noStudentFound = !results.rows.length;
      if(noStudentFound){
         res.send("Student does not exists in database");
      }

   pool.query(queries.removeStudent,[id],(error,results) =>{
      if(error) throw error;
      res.status(200).send("Student removed successfully!!!")
   })
   });
};

//Update student

const updateStudent = async (req,res) =>{
   const id = parseInt(req.params.id);
   const {name} = req.body;

   await pool.query(queries.getStudentsById,[id],(error,results) =>{
      const noStudentFound = !results.rows.length;
      if(noStudentFound){
         res.send("Student does not exists in database");
      }
      
      pool.query(queries.updateStudent,[name, id],(error,results) =>{
         if(error) throw error;
         res.status(200).send("Student Update Successfully!!!")
      });
   });
};

// checkPassword
// const checkPassword = async (req,res) =>{
//    const password = req.body.password;
//    await pool.query(queries.checkPassword,[password]).then((results) =>{
//       if(password === results.rows[0].password){
//          const token = jwt.sign({useremail: results.rows[0].email},  'hello',{expiresIn:'24h'});
//              res.status(200).send({token: token});
//       }
//    }).catch((err) =>{
//       res.status(401).send({message:"incorrect password"});
//    })
// };

const checkPassword = async (req,res) =>{
   const password = req.body.password;
   await pool.query(queries.checkPassword,[password]).then((results) =>{
      res.status(200).send(results.rows);
      const checkUser =hashValidator(password,results.rows[0].password)
      if(checkUser){
         const token = jwt.sign({useremail: results.rows[0].email},  'hello',{expiresIn:'24h'});
            res.status(200).send({token: token});
      } else{
         res.status(401).send({message:"incorrect password"});
      }
   }).catch((error) =>{
      res.send(error);
   })
 
}

//GET all students
const getStudents  =async (req,res) =>{
   await pool.query(queries.getStudents).then((response) =>{
      // console.log(req?.headers?.authorization)
      var decoded = jwt.verify(req?.headers?.authorization, 'hello');
      if(!decoded){
         res.sendStatus(403);
      }
      else{
         res.status(200).json({data : response.rows,});
      }
   }).catch((err) =>{
      res.status(401).json({
         name: 'JsonWebTokenError',
        message: 'invalid Token'
      })
   })
  
};

//Get a student by id
const getStudentsById = async (req,res) =>{
   const id = parseInt(req.params.id);
   await pool.query(queries.getStudentsById,[id]).then((response) =>{
      var decoded1 = jwt.verify(req?.headers?.authorization,'hello');
      if(!decoded1){
         res.sendStatus(403);
      }
      else{
         res.status(200).send({data: response.rows})
      }
   }).catch((err) =>{
      res.status(401).send({
         name: 'JsonWebTokenError',
        message: 'invalid Token'
      });
   });
};




module.exports = {
   getStudents,
   getStudentsById,
   addStudent,
   removeStudent,
   updateStudent,
   checkPassword,
};