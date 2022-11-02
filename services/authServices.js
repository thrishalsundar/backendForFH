const dbFeats=require('../database/dbSetup');
const { Address } = require('../models/models');
const passHelpers=require('../utils/passHelper');
const Respond = require('../utils/respHelper');
const tokenHelpers=require('../utils/tokenHelper')

async function Signup(signUpObj){
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
    
    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token,   last_login) values("${signUpObj.type}", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address.addId}", "${signUpObj.token}", "${signUpObj.refToken}", now()) ;`

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

async function CusLogin(loginObj){

    const checkQuery=`select * from user where type='c' and (user_id="${loginObj.userId}" or mobile_no="${loginObj.mobileNo}");`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);

        const toks=await tokenHelpers.UpdateToken(chosenOne.user_id,chosenOne.mobileNo);
        console.log(toks);
        chosenOne.token=toks.uptoken,chosenOne.ref_token=toks.uprefToken;

        //console.log(tokenHelpers.VerifyToken({email:chosenOne.email,mobileNo:chosenOne.mobileNo},chosenOne.token))
        
        return new Respond(chosenOne,null,"Let him in",200);
    } catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function ResLogin(loginObj){

    const checkQuery=`select * from user where type='r' and (user_id="${loginObj.userId}" or mobile_no="${loginObj.mobileNo}");`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);

        const toks=await tokenHelpers.UpdateToken(chosenOne.user_id,chosenOne.mobile_no);
        console.log(toks);
        chosenOne.token=toks.uptoken,chosenOne.refToken=toks.uprefToken;
        
        return new Respond(chosenOne,null,"Let him in",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function MovLogin(loginObj){

    const checkQuery=`select * from user where type='m' and (user_id="${loginObj.userId}" or mobile_no="${loginObj.mobileNo}");`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);

        const toks=await tokenHelpers.UpdateToken(chosenOne.user_id,chosenOne.mobile_no);
        chosenOne.token=toks.uptoken,chosenOne.refToken=toks.uprefToken;
        console.log(chosenOne);
        
        return new Respond(chosenOne,null,"Let him in",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function AdminLogin(loginObj){

    const checkQuery=`select * from admin where username="${loginObj.username}" ;`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);


        return new Respond(chosenOne,null,"Let him in",200);

    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

const authServices={Signup,CusLogin,ResLogin,MovLogin,AdminLogin};

module.exports=authServices;
