const express=require('express');
const authViews=require('../controllers/authViews');

const allRoutes=express.Router();

allRoutes.post('/signup',authViews.Signup);
allRoutes.post('/login',authViews.Login);

module.exports=allRoutes;
