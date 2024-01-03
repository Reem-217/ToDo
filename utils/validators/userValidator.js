const bcrypt=require('bcryptjs');
const { check,body}=require('express-validator');
const validatorMW=require('../../middlewares/validatorMW');
const User=require('../../models/userModel');

exports.createUserValidator=[
check('name')
.notEmpty().withMessage('User name required')
.isLength({min:3}).withMessage('Too short user name'),

check('email')
.notEmpty().withMessage('Email required')
.isEmail().withMessage('Invalid email address')
.custom((val)=>
    User.findOne({email:val}).then((user)=>{
        if(user)
        return Promise.reject(new Error(`This email already exisits`));
    })
),
check('password')
.notEmpty().withMessage('Password required')
.isLength({min:5}).withMessage('Too short password')
.custom((val,{req})=>{
   if(val!==req.body.passwordConfirm)
   throw new Error('Password confirmation does not match');
  return true;
}),
check('passwordConfirm').notEmpty().withMessage('Password confirmation reqiured'),
check('role').optional()
    ,validatorMW
];

exports.updateUserValidator=[
check('id').isMongoId().withMessage('Invalid id format'),
    body('name').optional()
    .isLength({min:3}).withMessage('Too short user name'),
    check('email').notEmpty().withMessage('Email required')
    .isEmail()
    .custom((val)=>
        User.findOne({email:val}).then((user)=>{
            if(user)
            return Promise.reject(new Error(`This email already exisits`));
        })
    ),

    check('role').optional()
    ,validatorMW
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMW,
];

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMW,
];
  
exports.changePasswordValidator=[

check('id').isMongoId().withMessage('Invalid id format')
,body('currentPassword').notEmpty().withMessage('You must enter you current password'),
body('passwordConfirm').notEmpty().withMessage('Password Confirmation required'),
body('password').notEmpty().withMessage('You must enter new password').
custom(async(val,{req})=>{
const user=await User.findById(req.params.id);
if(!user)
throw new Error('There is no user for this id');
const isCorrectPassword=await bcrypt.compare(req.body.currentPassword,user.password)
if (!isCorrectPassword) {
    throw new Error('Incorrect current password');
  }

  // 2) Verify password confirm
  if (val !== req.body.passwordConfirm) {
    throw new Error('Password Confirmation incorrect');
  }
  return true;
})

    ,validatorMW
];

exports.updateLoggedUserValidator = [
    body('name')
      .optional()
    ,
    check('email')
      .notEmpty()
      .withMessage('Email required')
      .isEmail()
      .withMessage('Invalid email address')
      .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      )
  
    ,validatorMW,
  ];
  
  
