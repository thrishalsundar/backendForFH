const express=require('express');
const movViews=require('../controllers/movViews');

const routes=express.Router();

routes.get('/',(req,res)=>{res.send({"msg":"underConstruction"})})

module.exports=routes;
