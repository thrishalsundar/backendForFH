const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function GetFoods(resId){
    const getFoodsQuery=`${resId}`;
    try{
        const dbResp=await dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function UpdateStock(resId,foodIds){

}

async function UpdateRestDets(restId,updatedDets){
    const updateResQuery=``;
    try{
        const dbResp=await dbFeats.doThis(updateResQuery);
        console.log(dbResp.results)
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function GetOrders(resId){
    const getOrdersQuery=``;

    try{
        const dbResp=await dbFeats.doThis(getOrdersQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function AddFoodItems(foodItemsObjects){
    const addFoodsQuery=``;

    try{
        const dbResp=await dbFeats.doThis(addFoodsQuery);
        return new Respond(null,null,"Successful",200)
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function UpdateOrderStatus(){}
async function UpdateFoodStatus(){}
async function UpdateOpenStatus(){}

const resServices={
    GetFoods,
    UpdateStock,
    UpdateRestDets,
    GetOrders,
    AddFoodItems,
    UpdateOrderStatus,
    UpdateFoodStatus,
    UpdateOpenStatus
}

module.exports=resServices;
