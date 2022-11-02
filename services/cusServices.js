const dbFeats=require('../database/dbSetup');
const {OrderItem} = require('../models/models');
const Respond = require('../utils/respHelper');

async function GetFoods(){

    const getFoodsQuery=`select * from food_item`;
    try{
        const dbResp=await dbFeats.doThis(getFoodsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function GetFood(foodId){
    const getFoodQuery=`select * from food_item where food_id="${foodId}"`;

    try{
        const dbResp=await dbFeats.doThis(getFoodQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }
}

async function GetRests(){

    const getRestsQuery=`select * from restaurant where open_status=1`;
    try{
        const dbResp=await dbFeats.doThis(getRestsQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function GetRest(restId){

    const getRestQuery=`select * from restaurant where res_id="${restId}"`;
    try{
        const dbResp=await dbFeats.doThis(getRestQuery);
        return new Respond(dbResp.results,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

async function CreateCart(newCart){

    const dbQuery=`insert into cart(cart_id,total,cus_id,res_id,created_at) values ("${newCart.cartId}", "${newCart.total}", "${newCart.cusId}", "${newCart.resId}", now())`;

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
        const retFoodItem=`select amount from food_item where food_id="${oItem.foodId}"`;    //
        try{
            const dbResp=await dbFeats.doThis(retFoodItem);
            orderIt.itemTotal=oItem.count*dbResp.results[0].amount;
            const insOrderItem=`insert into order_item(food_item,count,item_total,cart_id) values ("${oItem.foodId}", "${oItem.count}", "${orderIt.itemTotal}", "${cartId}")`;  //insert
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

    const updateCartQuery=`update cart set total="${totalAmount}" where cart_id="${cartId}"`;
    try{
        const dbResp=await dbFeats.doThis(updateCartQuery);
        console.log(JSON.stringify(dbResp));
        return new Respond(null,null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}
//
async function ConfirmCart(cartId){
    const dbQuery=`update cart set confirm_stat=1 where cart_id="${cartId}"`;

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
    const dbQuery=`delete from cart where cart_id="${cartId}"`

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
    const restQuery=`select * from restaurant where display_name like "%${searchQuery}%" and open_status=1`;
    const foodQuery=`select * from food_item where display_name like "%${searchQuery}%"`;
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
    const fetchCartDets=`select * from cart where cart_id="${orderObj.cartId}"`;
    let cartDets;

    try{
        const dbResp=await dbFeats.doThis(fetchCartDets);
        if(dbResp.results.length===0) return new Respond(null,"Status Bad Request","No Cart in this cartId",403);
        cartDets=dbResp.results[0];
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

    orderObj.FillCartDets(cartDets.cus_id,cartDets.add_id,cartDets.total);


    const insNewOrder=`insert into food_delivery_db.orders (order_id,cus_id,name,cart_id,ordered_at,order_stat,mobile_no,total,add_id) values("${orderObj.cartId}","${orderObj.cusId}" ,"${orderObj.name}", "${orderObj.cartId}" , now(), "i", "${orderObj.mobileNo}","${orderObj.total}","new_address")`;

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
    const fetchOrder=`select * from orders where order_id="${orderId}"`;
    const cancelOrder=`update orders set order_stat='x' where order_id="${orderId}"`;
    
    try{
        const dbResp=await dbFeats.doThis(fetchOrder);
        if(dbResp.results.length===0) return new Respond(null,"Status Bad Request","No Cart in this cartId",403);

        if(dbResp.results[0].order_stat!=='i') return new Respond(null,"Status Bad Request","Order Already Processed and cannot be cancelled",403);
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
