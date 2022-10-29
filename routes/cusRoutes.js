const express=require('express');
const cusViews=require('../controllers/cusViews');

const routes=express.Router();

routes.get('/foods',cusViews.GetFoods);

module.exports=routes;
