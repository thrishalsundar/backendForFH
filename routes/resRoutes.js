
const express=require('express');
const resViews=require('../controllers/resViews');

const routes=express.Router();

routes.get('/',(_,res)=>{res.send({"msg":"underConstruction"})});
routes.get('/myfoods',resViews.GetFoods);
routes.put('/upstocks',resViews.UpdateStock);
routes.put('/updaterest',resViews.UpdateRestDets);
routes.get('/forders',resViews.GetOrders);
routes.post('/addfoods',resViews.AddFoodItems);
routes.put('/upordstat',resViews.UpdateOrderStatus);
routes.put('/upfoodstat',resViews.UpdateFoodStatus);
routes.put('/upreststat',resViews.UpdateOpenStatus);

module.exports=routes;
