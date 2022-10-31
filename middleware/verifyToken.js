const tokenHelper=require("../utils/tokenHelper");
const Respond=require('../utils/respHelper');


async function VerifyTokens(req,res,next){

    const token=req.header("token");
    //console.log(token);
    if(!token) return res.status(403).send(Respond.statusBadRequest);

    try{
        const decoded=await tokenHelper.VerifyToken(token);
        console.log(decoded.user_id+"             "+req.header("user_id"));
        if(decoded.user_id!==req.header("user_id")) throw "userId!=tokenId";
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(403).send(Respond.statusBadRequest);
    }
}


module.exports=VerifyTokens;
