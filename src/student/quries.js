const getStudents = "SELECT * FROM students";
const getStudentsById= "SELECT * FROM students WHERE id=$1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email=$1";
const addStudent = "INSERT INTO students (name,email,age,dob,password) VALUES ($1,$2,$3,$4,$5)";
const removeStudent = "DELETE FROM students WHERE id= $1";
const updateStudent = "UPDATE students SET name=$1 WHERE id=$2";
const checkPassword = "SELECT id,name,email,password,age,dob FROM students WHERE password=$1";


module.exports={
   getStudents,
   getStudentsById,
   checkEmailExists,
   addStudent,
   removeStudent,
   updateStudent,
   checkPassword,
};