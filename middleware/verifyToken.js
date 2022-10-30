const tokenHelper=require("../utils/tokenHelper");
const Respond=require('../utils/respHelper');


async function VerifyTokens(req,res,next){

    const token=req.header("token");
    //console.log(token);
    if(!token) return res.status(403).send(Respond.statusBadRequest);

    try{
        const decoded=await tokenHelper.VerifyToken(token);
        //console.log(decoded.email+"             "+req.header("user_email"));
        if(decoded.email!==req.header("user_email")) throw "something";
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(403).send(Respond.statusBadRequest);
    }
}


module.exports=VerifyTokens;
