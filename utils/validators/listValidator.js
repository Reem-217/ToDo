const validatorMW=require("../../middlewares/validatorMW");
const {check}=require('express-validator');

exports.createListValidator=[
  check('title').notEmpty().withMessage('Title can not be empty')
  ,check('body').isLength({max:600}).withMessage('Too long body')
    ,validatorMW
];

exports.getListValidator=[
    check('id').isMongoId().withMessage('Invalid id format')
    ,validatorMW
];

exports.deleteListValidator=[
    check('id').isMongoId().withMessage('Invalid id format')
    ,validatorMW
];

exports.updateListValidator=[
   check('id').isMongoId().withMessage('Invalid id format')
  ,check('title').notEmpty().withMessage('Title can not be empty')
  ,check('body').isLength({max:600}).withMessage('Too long body')
    ,validatorMW
];
