const express=require('express');
const authViews=require('../controllers/authViews');
const dbFeats=require('../database/dbSetup');

const routes=express.Router();

async function TestFunction(_,res){

    const queryyy=`select * from user`;
    const dbResp=await dbFeats.doThis(queryyy);
    console.log("dbResp:"+dbResp);
    console.log("error:"+dbResp.error);
    console.log("results:"+dbResp.results);
    console.log("fields:"+dbResp.fields);

    res.send({"something":dbResp.results});

}

routes.get('/test',TestFunction);
routes.post('/signup',authViews.Signup);
routes.post('/cuslogin',authViews.CusLogin);
routes.post('/resLogin',authViews.ResLogin);
routes.post('/movLogin',authViews.MovLogin);

module.exports=routes;
