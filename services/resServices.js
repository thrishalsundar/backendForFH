const dbFeats = require("../database/dbSetup");
const Respond = require("../utils/respHelper");

async function GetFoods(resId){
    const getFoodsQuery=`select * from food_item where res_id="${resId}"`;
    try{
        const dbResp=await dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function UpdateStock(resId,foodIds){

    const foodIdBing=foodIds.toString();
    const foodIdString=foodIdBing.subString(1,foodIdBing.length-1);
    
    const updQuery=`update food_item set instock=1 where food_id in (${foodIdString})`;
    try{
        const dbResp=await dbFeats.doThis(updQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}
async function UpdateRestDets(resId,updatedDets){
    const updateResQuery=`update restaurant set display_name="${updatedDets.displayName}", branch="${updatedDets.branch}", email="${updatedDets.email}", logo_url="${updatedDets.logoUrl}", website="${updatedDets.website}", open_time="9am", close_time="5pm" where res_id="${resId}"`;
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
    const getOrdersQuery=`select o.order_id,o.cus_id,o.name,o.cart_id,o.ordered_at,o.order_stat, o.total from order o 
    join cart c on o.cart_id=c.cart where c.res_id="${resId}"`;

    try{
        const dbResp=await dbFeats.doThis(getOrdersQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function AddFoodItems(foodItemsObjects){
    const demoObj = foodItemsObjects[0];
    const addFoodsQuery=`insert into food_item (food_id,display_name,res_id,category_type,cuisine_type,is_veg,description,amount,contents,instock,image) values ("${demoObj.foodId}", "${demoObj.displayName}","${demoObj.resId}","${demoObj.categoryType}",
    "${demoObj.cuisine_type}", "${demoObj.is_veg}", "${demoObj.description}", "${demoObj.amount}", "${demoObj.contents}", 0 , "${demoObj.image}")`;  // [ {},{},{}  ]

    try{
        const dbResp=await dbFeats.doThis(addFoodsQuery);
        return new Respond(null,null,"Successful",200)
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}


async function UpdateOrderStatus(orderId){

    const updateOrderQuery=`update order set order_stat='c' where order_id="${orderId}"`;

    try{
        const dbResp=await dbFeats.doThis(updateOrderQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}
async function UpdateFoodStatus(foodData){

    const updateFoodQuery=`update food_item set instock="${foodData.instock}" where food_id="${foodData.foodId}"`;

    try{
        const dbResp=await dbFeats.doThis(updateFoodQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function UpdateOpenStatus(resData){

    const updateOpenStatQuery=`update restaurant set open_status="${resData.openstat}" where res_id="${resData.resId}"`;
    
    try{
        const dbResp=await dbFeats.doThis(updateOpenStatQuery);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

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