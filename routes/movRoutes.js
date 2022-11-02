const express=require('express');
const movViews=require('../controllers/movViews');

const routes=express.Router();

routes.get('/',(req,res)=>{res.send({"msg":"underConstruction"})})
routes.put('/movstat',movViews.UpdateAvail);
routes.post('/getorders',movViews.GetOrders);
routes.put('/claimorder',movViews.ClaimOrder);
routes.put('/orderstat',movViews.UpdateOrder);
routes.put('/delivered',movViews.DeliveryUpdate);

module.exports=routes;
