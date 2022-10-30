const Respond = require("../utils/respHelper");
const services=require("../services/cusServices");
const {Cart, Order} = require("../models/models");

async function GetFoods(_,res){
    try{
        const resp=await services.GetFoods(); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetFood(req,res){
    const foodId=req.query.foodId;
    try{
        const resp=await services.GetFood(foodId); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetRests(_,res){
    try{
        const resp=await services.GetRests(); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function GetRest(req,res){
    const rstId=req.query.resId;
    try{
        const resp=await services.GetRest(rstId); 
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function CreateCart(req,res){
    const cartData=req.body.cartData;

    const newCart=new Cart(cartData.cst,cartData.rst,cartData.time);
    if(newCart.CartValidator()===false) return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.CreateCart(newCart);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function UpdateCart(req,res){

    const cartData=req.body.cartData;
    if(cartData.cartId==="") return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.UpdateCart(cartData.cartId,cartData.cartContents);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }

}

async function ConfirmCart(req,res){
    const cartId=req.query.cartId;
    if(cartId==="") return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.ConfirmCart(cartId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function DeleteCart(req,res){
    const cartId=req.query.cartId;
    if(cartId==="") return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.DeleteCart(cartId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}


async function SearchRestOrFood(req,res){
    const searchQuery=req.query.searchQuery;
    if(searchQuery==="") return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.SearchRestOrFood(searchQuery);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function PlaceOrder(req,res){

    const orderDets=req.body.orderDets;
    const newOrder=new Order(orderDets.cartId,orderDets.name,orderDets.mobileNo);

    if(newOrder.OrderValidator()===false) return res.status(403).send(Respond.statusBadRequest);


    try{
        const resp=await services.PlaceOrder(newOrder);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}

async function CancelOrder(req,res){

    const orderId=req.query.orderId;
    if(orderId==="") return res.status(403).send(Respond.statusBadRequest);

    try{
        const resp=await services.CancelOrder(orderId);
        return res.status(resp.stat).send(resp);
    }catch(err){
        console.log(err);
        return res.status(500).send(Respond.internalServerError);
    }
}



const cusViews={
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
};

module.exports=cusViews;
