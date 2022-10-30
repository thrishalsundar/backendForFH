const dbFeats=require('../database/dbSetup');
const passHelpers=require('../utils/passHelper');
const Respond = require('../utils/respHelper');
const tokenHelpers=require('../utils/tokenHelper')

async function Signup(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    const toks=tokenHelpers.CreateToken(signUpObj.email,signUpObj.mobileNo);
    signUpObj.token=toks.token,signUpObj.refToken=toks.refToken;
    signUpObj.lastLogin=new Date();

    const insQuery=`insert into user(type , first_name , last_name , user_id , mobile_no,  password , email , address, token , ref_token,   last_login) values("${signUpObj.type}", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address}", "${signUpObj.token}", "${signUpObj.refToken}", now()) ;`

    try{
        const dbResp=await dbFeats.doThis(insQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"Signed up Successfully",200);
    } catch(err){
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

        const toks=await tokenHelpers.UpdateToken(chosenOne.email,chosenOne.mobileNo);
        console.log(toks);
        chosenOne.token=toks.uptoken,chosenOne.refToken=toks.uprefToken;

        //console.log(tokenHelpers.VerifyToken({email:chosenOne.email,mobileNo:chosenOne.mobileNo},chosenOne.token))
        
        return new Respond(chosenOne,null,"Let him in",200);
    } catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function ResLogin(loginObj){

    const checkQuery=`select * from users where type='res' and (userid="${loginObj.userId}" or mobileNo="${loginObj.mobileNo}");`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);

        const toks=await tokenHelpers.UpdateToken(chosenOne.email,chosenOne.mobileNo);
        console.log(toks);
        chosenOne.token=toks.uptoken,chosenOne.refToken=toks.uprefToken;
        
        return new Respond(chosenOne,null,"Let him in",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function MovLogin(loginObj){

    const checkQuery=`select * from users where type='move' and (userid="${loginObj.userId}" or mobileNo="${loginObj.mobileNo}");`;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

        const chosenOne=dbResp.results[0];
        if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);

        const toks=await tokenHelpers.UpdateToken(chosenOne.email,chosenOne.mobileNo);
        chosenOne.token=toks.uptoken,chosenOne.refToken=toks.uprefToken;

        
        return new Respond(chosenOne,null,"Let him in",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

const authServices={Signup,CusLogin,ResLogin,MovLogin};

module.exports=authServices;
