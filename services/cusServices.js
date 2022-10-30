const dbFeats=require('../database/dbSetup');
const {OrderItem} = require('../models/models');
const Respond = require('../utils/respHelper');

async function GetFoods(){

    const getFoodsQuery=``;
    try{
        const dbResp=await dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function GetFood(foodId){
    const getFoodQuery=`${foodId}`;

    try{
        const dbResp=await dbFeats.doThis(getFoodQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function GetRests(){

    const getRestsQuery=``;
    try{
        const dbResp=await dbFeats.doThis(getRestsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function GetRest(restId){

    const getRestQuery=`${restId}`;
    try{
        const dbResp=await dbFeats.doThis(getRestQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function CreateCart(newCart){

    const dbQuery=`${newCart}`;

    try{
        const dbResp=await dbFeats.doThis(dbQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
    
}


async function UpdateCart(cartId,cartContents){

    let orderItemArr=[];
    let totalAmount=0;
    for(const oItem of cartContents){
        const orderIt=new OrderItem(oItem.foodId,oItem.count,cartId);
        const retFoodItem=``;
        const insOrderItem=``;
        try{
            const dbResp=await dbFeats.doThis(retFoodItem);
            orderIt.itemTotal=oItem.count*dbResp.results[0].amount;
            const dbResp1=await dbFeats.doThis(insOrderItem);
            console.log(dbResp1);
            orderIt.foodItem=dbResp.results[0];
            orderItemArr.push(orderIt)
            totalAmount+=orderIt.itemTotal;
        }catch(err){
            console.log(err);
            return Respond.internalServerError;
        }
    }

    const updateCartQuery=`${totalAmount}`;
    try{
        const dbResp=await dbFeats.doThis(updateCartQuery);
        dbResp.results[0].cartContents=orderItemArr;
        const some=dbResp.results[0]
        return new Respond(some,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}
//
async function ConfirmCart(cartId){
    const dbQuery=`${cartId}`

    try{
        const dbResp=await dbFeats.doThis(dbQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function DeleteCart(cartId){
    const dbQuery=`${cartId}`

    try{
        const dbResp=await dbFeats.doThis(dbQuery);
        console.log(dbResp.results);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function SearchRestOrFood(searchQuery){
    const restQuery=`${searchQuery}`;
    const foodQuery=`${searchQuery}`;
    let restRes,foodRes;

    try{
        const dbResp=await dbFeats.doThis(restQuery);
        restRes=dbResp.results;
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

    try{
        const dbResp=await dbFeats.doThis(foodQuery);
        foodRes=dbResp.results;
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

    return new Respond({restRes,foodRes},null,"Successful",200);
}

async function PlaceOrder(orderObj){
    const fetchCartDets=``;
    let cartDets;

    try{
        const dbResp=await dbFeats.doThis(fetchCartDets);
        if(dbResp.results.length===0) return new Respond(null,"Status Bad Request","No Cart in this cartId",403);
        cartDets=dbResp.results[0];
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

    orderObj.FillCartDets(cartDets);

    const insNewOrder=``;

    try{
        const dbResp=await dbFeats.doThis(insNewOrder);
        console.log(dbResp.results);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function CancelOrder(orderId){
    const fetchOrder=`${orderId}`;
    const cancelOrder=``;
    
    try{
        const dbResp=await dbFeats.doThis(fetchOrder);
        if(dbResp.results.length===0) return new Respond(null,"Status Bad Request","No Cart in this cartId",403);

        if(dbResp.results[0].orderStat!=='ini') return new Respond(null,"Status Bad Request","Order Already Processed and cannot be cancelled",403);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

    try{
        const dbResp=await dbFeats.doThis(cancelOrder);
        console.log(dbResp.results);
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

const cusServices={
    GetFoods,
    GetFood,
    GetRests,
    GetRest,
    CreateCart,
    UpdateCart,
    ConfirmCart,
    DeleteCart,
    SearchRestOrFood,
    PlaceOrder,
    CancelOrder,
}

module.exports=cusServices;
