const express=require('express');
const authViews=require('../controllers/authViews');

const routes=express.Router();

routes.post('/signup',authViews.Signup);
routes.post('/cuslogin',authViews.CusLogin);
routes.post('/resLogin',authViews.ResLogin);
routes.post('/movLogin',authViews.MovLogin);

module.exports=routes;
