const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function GetFoods(){

    const getFoodsQuery=``;

    try{
        const dbResp=dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}                          

async function  GetRests(){

    const getRestsQuery=``;

    try{
        const dbResp=dbFeats.doThis(getRestsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function CreateRestaurant(restObj){
    const insQuery=``;

    try{
        const dbResp=dbFeats.doThis(insQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function NewResUser(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    console.log(signUpObj.userId);
    const toks=tokenHelpers.CreateToken(signUpObj.userId,signUpObj.mobileNo);
    signUpObj.token=toks.token,signUpObj.refToken=toks.refToken;
    signUpObj.lastLogin=new Date();
    
    const insQuery=``;

    try{
        const dbResp=dbFeats.doThis(insQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function NewMovUser(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    console.log(signUpObj.userId);
    const toks=tokenHelpers.CreateToken(signUpObj.userId,signUpObj.mobileNo);
    signUpObj.token=toks.token,signUpObj.refToken=toks.refToken;
    signUpObj.lastLogin=new Date();
    
    const insQuery=``;

    try{
        const dbResp=dbFeats.doThis(insQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function DeleteRestaurant(resId){
    const deleteQuery=``;

    try{
        const dbResp=dbFeats.doThis(deleteQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function DeleteUser(userId){
    const deleteQuery=``;

    try{
        const dbResp=dbFeats.doThis(deleteQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function SearchRest(searchQuery){

    const searchDbQuery=``;

    try{
        const dbResp=dbFeats.doThis(searchDbQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function SearchFood(searchQuery){

    const searchDbQuery=``;

    try{
        const dbResp=dbFeats.doThis(searchDbQuery);
        console.log(JSON.stringify(dbResp))
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

const adminServices={
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

module.exports=adminServices;
