const express=require('express');
const auth=require('../controllers/authController');

const {createUser,updateLoggedUserData,updateUser,deleteUser,
    deactivate,
    getLoggedUserDate,
    getUser,
    getUsers,
    changePassword}=require('../controllers/userController');

const {createUserValidator,
    changePasswordValidator,
     getUserValidator,
     deleteUserValidator,
     updateLoggedUserValidator,
     updateUserValidator}=require('../utils/validators/userValidator');

const router=express.Router();
router.use(auth.protect);
//Admin

router.delete('/deleteme',deactivate);
router.put('/updateme',updateLoggedUserValidator,updateLoggedUserData);
router.get('/getme',getLoggedUserDate,getUser);

router.use(auth.allowedTo('admin'));
router.route('/').get(getUsers).post(createUserValidator,createUser)
router.route('/:id').put(updateUserValidator,updateUser).delete(deleteUserValidator,deleteUser).get(getUserValidator,getUser);
router.put('/changePassowrd/:id',changePasswordValidator,changePassword);










module.exports=router;