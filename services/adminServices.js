const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");
const passHelpers = require("../utils/passHelper");
const tokenHelpers = require("../utils/tokenHelper");

async function GetFoods(){

    const getFoodsQuery=`select * from food_item`;

    try{
        const dbResp=dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}                          

async function  GetRests(){

    const getRestsQuery=`select * from restaurant`;

    try{
        const dbResp=dbFeats.doThis(getRestsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function CreateRestaurant(restObj){
    const insQuery=`insert into food_delivery_db.restaurant (display_name,branch,res_id,email,address,open_time,close_time) values("${restObj.displayName}","${restObj.branch}","${restObj.resId}","${restObj.email}","enter address",now(),now())`; //insert

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
    
    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token,   last_login) values("r", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address}", "${signUpObj.token}", "${signUpObj.refToken}", now())`;

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
    
    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token, is_available, last_login) values("m", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address}", "${signUpObj.token}", "${signUpObj.refToken}",0,now()) ;`;

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
    const deleteQuery=`delete from restaurant where res_id="${resId}"`;

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
    const deleteQuery=`delete from user where user_id="${userId}"`;

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

    const searchDbQuery=`select * from restaurant where display_name like "%${searchQuery}%"`;

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

    const searchDbQuery=`select * from food_item where display_name like "%${searchQuery}%" `;

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
