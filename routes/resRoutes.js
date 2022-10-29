
const express=require('express');
const resViews=require('../controllers/resViews');

const routes=express.Router();

routes.get('/',(req,res)=>{res.send({"msg":"underConstruction"})})

module.exports=routes;
