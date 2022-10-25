const dbFeats=require('../database/dbSetup');
const passHelpers=require('../utils/passHelper');
const Respond = require('../utils/respHelper');
const tokenHelpers=require('../utils/tokenHelper')

async function Signup(signUpObj){
    signUpObj.password=passHelpers.HashIt(signUpObj.password);
    signUpObj.token=tokenHelpers.CreateToken(signUpObj.email,signUpObj.mobileNo);
    signUpObj.refToken=tokenHelpers.CreateToken(signUpObj.email,signUpObj.mobileNo);
    signUpObj.lastLogin=new Date();

    const insQuery=`insert into users(type , fName , lName , userid , mobileNo,  password , email , address, token , refToken, lastLogin) values("${signUpObj.type}", "${signUpObj.fName}", "${signUpObj.lName}", "${signUpObj.userId}", ${signUpObj.mobileNo}, "${signUpObj.password}", "${signUpObj.email}", "${signUpObj.address}", "${signUpObj.token}", "${signUpObj.refToken}", now()) ;`

    const dbResp=await dbFeats.doThis(insQuery);

    if(dbResp.error){
        console.log(dbResp.error)
        return Respond.internalServerError;
        //return {err:dbResp.error,msg:"Internal Server Error",stat:500};
    }

    return new Respond(null,null,"Signed up Successfully",200);
    //return {err:null,msg:"Signed Up Successfully",stat:200};
}

async function Login(loginObj){

    const checkQuery=`select * from users where userid="${loginObj.userid}" or mobileNo="${loginObj.mobileNo}";`;

    const dbResp=await dbFeats.doThis(checkQuery)
    if(dbResp.error){
        console.log(dbResp.error)
        return Respond.internalServerError;
        //return {err:dbResp.error,msg:"Internal Server Error",stat:500};
    }

    if(dbResp.results.length==0) return new Respond(null,"Status Bad Request","No User Found",403);

    const chosenOne=dbResp.results[0];
    if(passHelpers.VerifyPass(loginObj.password,chosenOne.password)==false) return new Respond(null,"Status Bad Request","Wrong Password",403);
    
    return new Respond(dbResp.results[0],null,"Let him in",200);
}

const authServices={Signup,Login};

module.exports=authServices;
