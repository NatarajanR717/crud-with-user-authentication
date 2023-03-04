const {Router} = require('express');
const controller = require('./controller');
const router = Router();

const { addUserValidation } = require('../../validation/user/user.validation')

router.get('/', controller.getStudents);
router.post('/',addUserValidation,controller.addStudent);
router.delete('/:id',controller.removeStudent);
router.put('/:id',controller.updateStudent);
router.get('/:id',controller.getStudentsById);
router.post('/login',controller.checkPassword);

module.exports = router;