const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");
const passHelpers = require("../utils/passHelper");
const tokenHelpers = require("../utils/tokenHelper");
const {Address} = require("../models/models");

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
    console.log(restObj);
    const countQuery = `select count(*) as count from address where user_id="${restObj.resId}"`;
    try{
        const dbResp=await dbFeats.doThis(countQuery);
        const cc=(dbResp.results[0].count)+1;
        restObj.address.addId = restObj.resId+'#'+cc.toString();  //str+int
    }catch(err){
        console.log(err)
        return Respond.internalServerError;
    }

    const insQuery=`insert into restaurant (display_name,branch,res_id,email,logo_url,website,address,open_time,close_time) values("${restObj.displayName}","${restObj.branch}","${restObj.resId}","${restObj.email}","${restObj.logoUrl}","${restObj.website}","${restObj.address.addId}","${restObj.oTime}","${restObj.cTime}")`; //insert

    try{
        const dbResp=dbFeats.doThis(insQuery);
        console.log(JSON.stringify(dbResp));

    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
    
    const addQuery = `insert into address (add_id,user_id,door_no,street_name,landmark,city,state,pincode) values ("${restObj.address.addId}","${restObj.address.userId}","${restObj.address.houseNo}","${restObj.address.streetName}","${restObj.address.landmark}","${restObj.address.city}","${restObj.address.state}","${restObj.address.pincode}")`;
    try{
        const dbResp=await dbFeats.doThis(addQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"successfull",200);
    }catch(err){
        console.log(err)
        return Respond.internalServerError;
    }
}

async function NewResUser(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    console.log(signUpObj.userId);
    const toks=tokenHelpers.CreateToken(signUpObj.userId,signUpObj.mobileNo);
    signUpObj.token=toks.token,signUpObj.refToken=toks.refToken;
    console.log(signUpObj.address);

    signUpObj.lastLogin=new Date();
    signUpObj.address=new Address(signUpObj.address);

    const countQuery = `select count(*) as count from address where user_id="${signUpObj.userId}"`;
    try{
        const dbResp=await dbFeats.doThis(countQuery);
        const cc=(dbResp.results[0].count)+1;
        signUpObj.address.addId = signUpObj.userId+'#'+cc.toString();  //str+int
    }catch(err){
        console.log(err)
        return Respond.internalServerError;
    }
    
    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token,   last_login) values("r", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address.addId}", "${signUpObj.token}", "${signUpObj.refToken}", now()) ;`

    try{
        const dbResp=await dbFeats.doThis(insQuery);
        console.log(dbResp.results);
        
    } catch(err){
        console.log(err)
        return Respond.internalServerError;
    }

    const addQuery = `insert into address (add_id,user_id,door_no,street_name,landmark,city,state,pincode) values ("${signUpObj.address.addId}","${signUpObj.address.userId}","${signUpObj.address.houseNo}","${signUpObj.address.streetName}","${signUpObj.address.landmark}","${signUpObj.address.city}","${signUpObj.address.state}","${signUpObj.address.pincode}")`;
    try{
        const dbResp=await dbFeats.doThis(addQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"successfull",200);
    }catch(err){
        console.log(err)
        return Respond.internalServerError;
    }

}

async function NewMovUser(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    console.log(signUpObj.userId);
    const toks=tokenHelpers.CreateToken(signUpObj.userId,signUpObj.mobileNo);
    signUpObj.token=toks.token,signUpObj.refToken=toks.refToken;
    console.log(signUpObj.address);

    signUpObj.lastLogin=new Date();
    signUpObj.address=new Address(signUpObj.address);

    const countQuery = `select count(*) as count from address where user_id="${signUpObj.userId}"`;
    try{
        const dbResp=await dbFeats.doThis(countQuery);
        const cc=(dbResp.results[0].count)+1;
        signUpObj.address.addId = signUpObj.userId+'#'+cc.toString();  //str+int
    }catch(err){
        console.log(err)
        return Respond.internalServerError;
    }
    
    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token, is_available , last_login) values("m", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address.addId}", "${signUpObj.token}", "${signUpObj.refToken}",0, now()) ;`

    try{
        const dbResp=await dbFeats.doThis(insQuery);
        console.log(dbResp.results);
        
    } catch(err){
        console.log(err)
        return Respond.internalServerError;
    }

    const addQuery = `insert into address (add_id,user_id,door_no,street_name,landmark,city,state,pincode) values ("${signUpObj.address.addId}","${signUpObj.userId}","${signUpObj.address.houseNo}","${signUpObj.address.streetName}","${signUpObj.address.landmark}","${signUpObj.address.city}","${signUpObj.address.state}","${signUpObj.address.pincode}")`;
    try{
        const dbResp=await dbFeats.doThis(addQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"successfull",200);
    }catch(err){
        console.log(err)
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
