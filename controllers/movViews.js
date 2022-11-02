const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");
const services=require("../services/movServices");
const {RandGen} = require("../utils/otherUtils");

async function UpdateAvail(req,res){

    const movId=req.query.movId;
    const stat=req.query.stat;
    if(movId=='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateAvail(movId,stat);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetOrders(req,res){

    const address=req.body.address;
    if(!address || address.pincode==='') return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.GetOrders(address);
        return res.status(resp.stat).send(resp)
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function ClaimOrder(req,res){

    const movId=req.query.movId;
    const orderId=req.query.orderId;
    if(!movId || movId==='') return res.status(403).send(Respond.statusBadRequest);
    if(!orderId || orderId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.ClaimOrder(movId,orderId);
        return res.status(resp.stat).send(resp)
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
    
}

async function UpdateOrder(req,res){

    const orderId=req.query.orderId;
    if(!orderId || orderId==='') return res.status(403).send(Respond.statusBadRequest);

    const otpNo=RandGen(4);

    try{
        const resp=await services.UpdateOrder(orderId,otpNo);
        return res.status(403).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}


async function DeliveryUpdate(req,res){

    const secKey=req.body.secKey;
    const orderId=req.query.orderId;

    try{
        const resp=await services.DeliveryUpdate(secKey,orderId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

const movViews={
    UpdateAvail,
    GetOrders,
    ClaimOrder,
    UpdateOrder,
    DeliveryUpdate,
}


module.exports=movViews;
