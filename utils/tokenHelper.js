const jwt=require('jsonwebtoken');
const secKey="aganaga";
const dbFeats=require('../database/dbSetup');

function CreateToken(user_id,mobileNo){
    const token=jwt.sign({user_id,mobileNo}, secKey,{expiresIn: '24h' })
    const refToken=jwt.sign({user_id,mobileNo}, secKey,{expiresIn: '168h' })
    return {token,refToken};
}

async function UpdateToken(user_id,mobileNo){
    const toks=CreateToken(user_id, mobileNo);
    uptoken=toks.token;uprefToken=toks.refToken;
    console.log(uptoken+"                                                   "+uprefToken);

    const changeQuery=`update user set token="${uptoken}", ref_token="${uprefToken}", last_login=now() where user_id="${user_id}"`;

    try{
        const dbResp=await dbFeats.doThis(changeQuery);
        console.log(dbResp.results);
        return {uptoken,uprefToken};
    }catch(err){
        console.log(err);
        return {token:null,refToken:null}
    }

}


function VerifyToken(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token, secKey, function(err,decoded){
            if(err){
                return reject(err);
            }
            return resolve(decoded);
        })
    })
}

const tokenHelpers={CreateToken,UpdateToken,VerifyToken}

module.exports=tokenHelpers;

