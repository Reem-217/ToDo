const express=require('express');
const{createList,getList,updateList,getLists,deleteList}=require("../controllers/listController.js");
const {getListValidator,updateListValidator,deleteListValidator,createListValidator}=require('../utils/validators/listValidator');
const auth=require('../controllers/authController');

const router=express.Router();

router.use(auth.protect);

router.route('/').post(createListValidator,createList).get(getLists);
router.route('/:id')
.get(getListValidator,getList)
.put(updateListValidator,updateList)
.delete(deleteListValidator,deleteList);


module.exports=router;