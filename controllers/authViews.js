const {User} =require('../models/models');
const Respond=require('../utils/respHelper')
const services=require('../services/authServices');


async function Signup(req,res){
    const newUser=new User(req.body.signupObj);
    if (newUser.SignupValidator()==false){
        return res.send(Respond.statusBadRequest);
    }

    try{
        const resp=await services.Signup(newUser);
        return res.status(resp.stat).send(resp);
    }catch(err){
        return res.status(500).send(Respond.internalServerError);
    }
}

async function AdminLogin(req,res){
    const logObj=new User(req.body.loginCreds);
    if(logObj.type!=='a'){
        return res.send(Respond.statusBadRequest);
    }
    if(logObj.LoginValidator()==false){
        return res.send(Respond.statusBadRequest);
    }


    try{
        const resp=await services.AdminLogin(logObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        return res.status(500).send(Respond.internalServerError);
    }
}
    


async function CusLogin(req,res){
    const logObj=new User(req.body.loginCreds);
    if(logObj.type!=='c'){
        return res.send(Respond.statusBadRequest);
    }
    if(logObj.LoginValidator()==false){
        return res.send(Respond.statusBadRequest);
    }


    try{
        const resp=await services.CusLogin(logObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        return res.status(500).send(Respond.internalServerError);
    }
}

async function ResLogin(req,res){
    const logObj=new User(req.body.loginCreds);
    if(logObj.type!=='res'){
        return res.send(Respond.statusBadRequest);
    }
    if(logObj.LoginValidator()==false){
        return res.send(Respond.statusBadRequest);
    }

    try{
        const resp=await services.ResLogin(logObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        return res.status(500).send(Respond.internalServerError);
    }
}

async function MovLogin(req,res){
    const logObj=new User(req.body.loginCreds);
    if(logObj.type!=='mov'){
        return res.send(Respond.statusBadRequest);
    }
    if(logObj.LoginValidator()==false){
        return res.send(Respond.statusBadRequest);
    }

    try{
        const resp=await services.MovLogin(logObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        return res.status(500).send(Respond.internalServerError);
    }
}

const authViews={ Signup,AdminLogin,CusLogin,ResLogin,MovLogin };

module.exports=authViews;
