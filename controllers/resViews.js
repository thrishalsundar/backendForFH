const Respond = require("../utils/respHelper");
const services=require("../services/resServices");
const {FoodItem}=require("../models/models");

async function GetFoods(req,res){

    const resId=req.query.resId;
    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.GetFoods(resId); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}


async function UpdateStock(req,res){

    const resId=req.query.resId;
    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);

    const foodIds=req.body.foodIds;
    if(!foodIds || foodIds.length===0) return res.status(403).send(Respond.statusBadRequest);
    console.log("priya");
    try{
        const resp=await services.UpdateStock(resId,foodIds);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}


async function UpdateRestDets(req,res){

    const resId=req.query.resId;
    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);

    const updatedDets=req.body.resDets;
    if(!updatedDets || updatedDets.resId==="") return  res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.UpdateRestDets(resId,updatedDets);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}


async function UpdateRestAddress(req,res){
    const address=req.body.address;
    const resId=req.query.resId;
    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.UpdateRestAddress(resId,address);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetOrders(req,res){

    const resId=req.query.resId;
    if(!resId || resId==='') return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.GetOrders(resId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function AddFoodItems(req,res){

    const resId=req.query.resId;
    const foodItems=req.body.foodItems;
    //console.log(new FoodItem(foodItems[0]));
    let foodItemsObjects=[];

    for(const fI of foodItems){
        const foodItemObject=new FoodItem(resId,fI);
        if(foodItemObject.FoodValidator===false){
            //console.log(67);
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

    const foodData = req.body.foodData;

    if(!foodData || foodData.foodId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateFoodStatus(foodData);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function UpdateOpenStatus(req,res){

    const resData=req.body.resData;

    if(!resData || resData.resId==='') return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.UpdateOpenStatus(resData);
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
    UpdateRestAddress,
    GetOrders,
    AddFoodItems,
    UpdateOrderStatus,
    UpdateFoodStatus,
    UpdateOpenStatus
}

module.exports=resViews;
