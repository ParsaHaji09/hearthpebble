const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

// register
router.route('/').post(usersController.createNewUser);

// login
router.route('/login').post(usersController.verifyUser);

// retrieve users
router.route('/all-users').get(usersController.getAllUsers);

router.route('/:id').get(usersController.getUser)
                    .put(usersController.updateUser);

module.exports = router