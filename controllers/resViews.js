const Respond = require("../utils/respHelper");
const services=require("../services/resServices");
const FoodItem=require("../models/models");

async function GetFoods(_,res){
    try{
        const resp=await services.GetFoods(); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}


async function UpdateStock(req,res){
    const foodIds=req.body.foodIds;
    if(!foodIds || foodIds.length===0) return res.status(403).send(Respond.statusBadRequest);
    
    try{
        const resp=await services.UpdateStock(foodIds);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}


async function UpdateRestDets(req,res){
    const updatedDets=req.body.resDets;

    if(!updatedDets || updatedDets.resId==="") return  res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.UpdateRestDets(updatedDets);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetOrders(_,res){

    try{
        const resp=await services.GetOrders();
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function AddFoodItems(req,res){
    const resId=req.query.resId;
    const foodItems=req.body.foodItems;

    let foodItemsObjects;

    if(!resId || resId==="") return res.status(403).send(Respond.statusBadRequest);

    for(const fI in foodItems){
        const foodItemObject=new FoodItem(resId,fI);
        if(foodItemObject.FoodValidator===false){
            console.log(67);
            return res.status(403).send(Respond.statusBadRequest);
        }
        foodItemsObjects.push(foodItemObject);
    }


    try{
        const resp=await services.AddFoodItems(foodItemsObjects);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}




async function UpdateOrderStatus(req,res){

    const orderId=req.query.orderId;

    if(!orderId || orderId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateOrderStatus(orderId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function UpdateFoodStatus(req,res){

    const foodId=req.query.orderId;

    if(!foodId || foodId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateFoodStatus(foodId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function UpdateOpenStatus(req,res){

    const resId=req.query.resId;

    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateOpenStatus(resId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}



const resViews={
    GetFoods,
    UpdateStock,
    UpdateRestDets,
    GetOrders,
    AddFoodItems,
    UpdateOrderStatus,
    UpdateFoodStatus,
    UpdateOpenStatus
}

module.exports=resViews;