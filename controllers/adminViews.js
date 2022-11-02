const Respond = require("../utils/respHelper");
const services= require("../services/adminServices");
const {Restaurant, User} = require("../models/models");

async function GetFoods(_,res){
    try{
        const resp=await services.GetFoods();
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}                          

async function  GetRests(_,res){

    try{
        const resp=await services.GetRests();
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function CreateRestaurant(req,res){

    const restData=req.body.restData;
    const restObj=new Restaurant(restData);

    try{
        const resp=await services.CreateRestaurant(restObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function NewResUser(req,res){

    const signUpData=req.body.signUpData;
    const signUpObj=new User(signUpData);

    try{
        const resp=await services.NewResUser(signUpObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function NewMovUser(req,res){

    const signUpData=req.body.signUpData;
    const signUpObj=new User(signUpData);

    try{
        const resp=await services.NewMovUser(signUpObj);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function DeleteRestaurant(req,res){

    const resId=req.query.resId;
    if(resId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.DeleteRestaurant(resId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function DeleteUser(req,res){

    const userId=req.query.resId;
    if(userId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.DeleteUser(userId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function SearchRest(req,res){
    
    const keyWord=req.query.keyWord;
    if(keyWord===``) return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.SearchRest(keyWord);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function SearchFood(req,res){

    const keyWord=req.query.keyWord;
    if(keyWord===``) return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.SearchFood(keyWord);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

const adminViews={
    GetFoods,
    GetRests,
    CreateRestaurant,
    NewResUser,
    NewMovUser,
    DeleteRestaurant,
    DeleteUser,
    SearchRest,
    SearchFood,
}

module.exports=adminViews;
