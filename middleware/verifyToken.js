const tokenHelper=require("../utils/tokenHelper");
const Respond=require('../utils/respHelper');


async function VerifyTokens(req,res,next){

    const token=req.header("token");
    console.log(token);
    if(!token) return res.status(403).send(Respond.statusBadRequest);

    try{
        const decoded=await tokenHelper.VerifyToken(token);
        req.user=decoded;
        next();
        console.log("sh")
    }catch(err){
        console.log(err);
        return res.status(403).send(Respond.statusBadRequest);
    }
}


module.exports=VerifyTokens;
