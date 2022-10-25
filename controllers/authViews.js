const {User} =require('../models/models');
const Respond=require('../utils/respHelper')
const services=require('../services/authServices')


async function Signup(req,res){
    const newUser=new User(req.body.signupObj);
    if (newUser.SignupValidator()==false){
        res.send(Respond.statusBadRequest);
        return;
    }

    const resp=await services.Signup(newUser);
    //clogthis

    res.status(resp.stat).send(resp);
    return;
}

async function Login(req,res){
    const logObj=new User(req.body.loginCreds);
    if(logObj.LoginValidator()==false){
        res.send(Respond.statusBadRequest);
        return;
    }

    const resp=await services.Login(logObj);

    res.status(resp.stat).send(resp);
    return;
}

const authViews={Signup,Login};

module.exports=authViews;
