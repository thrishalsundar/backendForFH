const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function UpdateAvail(movId,stat){
    let ti = (stat)?1:0;
    const updateQuery=`update user set is_available="${ti}" where user_id="${movId}"`;  //user for m

    try{
        const dbResp=await dbFeats.doThis(updateQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function GetOrders(address){
    const getOrdersQuery=`select orders.* from orders o join address a on o.add_id = a.add_id where a.pincode="${address.pincode}"`;  //add.pincode select  add_id add in orders (user_id+door_no)

    try{
        const dbResp=await dbFeats.doThis(getOrdersQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function ClaimOrder(movId,orderId){
    const claimOrderQuery=`update orders set orders mov_id="${movId}" where order_id="${orderId}"`;  //orders mover=movID update

    try{
        const dbResp=await dbFeats.doThis(claimOrderQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function UpdateOrder(orderId,otpNo){
    const updateQuery=`update orders set order_stat='o', secret_id="${otpNo}" where order_id="${orderId}" `;   // update to out4 se=otpNo

    try{
        const dbResp=await dbFeats.doThis(updateQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function DeliveryUpdate(secKey,orderId){

    const checkQuery=`select secret_id from orders where secret_id="${secKey}" `; //check

    try{
        const dbResp=await dbFeats.doThis(checkQuery);
        const keyFromDb=dbResp.results[0].secret_id;

        if(keyFromDb!==secKey) throw "Wrong Secret Key";

        const updateQuery=`update orders set order_stat='d' where order_id="${orderId}"`; //update d

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
