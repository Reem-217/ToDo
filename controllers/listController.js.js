const List=require("../models/listModel");
const factory=require('./handlersFactory');


exports.createList=factory.createOne(List);

exports.getList=factory.getOne(List,{path:'User',select:'name'});

exports.updateList=factory.updateOne(List);

exports.getLists=factory.getAll(List);

exports.deleteList=factory.deleteOne(List);

