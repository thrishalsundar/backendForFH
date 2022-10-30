const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function UpdateAvail(req,res){

    const movId=req.query.movId;
    if(movId=='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const dbResp=await dbFeats.doThis()

    }catch(err){

    }
}

async function GetOrders(req,res){
}

async function ClaimOrder(req,res){
}

async function UpdateOrder(req,res){
}

async function DeliveryUpdate(req,res){
}

const movViews={
    UpdateAvail,
    GetOrders,
    ClaimOrder,
    UpdateOrder,
    DeliveryUpdate,
}

module.exports=movViews;
