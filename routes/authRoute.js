const express=require('express');
const {signup,
login,
forgetPassword,
resetPassword,
verifyPassResetCode}=require('../controllers/authController');

const {signupValidator,loginValidator}=require("../utils/validators/authvalidator");

const router=express.Router();
router.post('/signup',signupValidator,signup);
router.post('/login',loginValidator,login)
router.post('/forgetPassword',forgetPassword);
router.post('/verifyResetCode',verifyPassResetCode);
router.put('/resetPassword',resetPassword);






module.exports=router;