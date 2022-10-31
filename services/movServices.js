const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function UpdateAvail(movId,stat){
    const updateQuery=``;

    try{
        const dbResp=await dbFeats.doThis(updateQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function GetOrders(address){
    const getOrdersQuery=``;

    try{
        const dbResp=await dbFeats.doThis(getOrdersQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function ClaimOrder(movId,orderId){
    const claimOrderQuery=``;

    try{
        const dbResp=await dbFeats.doThis(claimOrderQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function UpdateOrder(orderId,otpNo){
    const updateQuery=``;

    try{
        const dbResp=await dbFeats.doThis(updateQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function DeliveryUpdate(secKey,orderId){

    const checkQuery=``;

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        const keyFromDb=dbResp.results[0].secret_id;

        if(keyFromDb!==secKey) throw "Wrong Secret Key";

        const updateQuery=``;

        const dbResp1=await dbFeats.doThis(updateQuery);
        console.log(dbResp1);
        return new Respond(null,null,"Successful",200);

    }catch(err){
        if(err==="Wrong Secret Key") return new Respond(null,"Status Bad Request",err,403);

        console.log(err);
        return Respond.internalServerError;
    }
}




const movServices={
    UpdateAvail,
    GetOrders,
    ClaimOrder,
    UpdateOrder,
    DeliveryUpdate,
}

module.exports=movServices;
