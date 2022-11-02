const express=require('express');
const cusViews=require('../controllers/cusViews');

const routes=express.Router();

routes.get('/foods',cusViews.GetFoods);
routes.get('/food',cusViews.GetFood);
routes.get('/rests',cusViews.GetRests);
routes.get('/rest',cusViews.GetRest);
routes.post('/newcart',cusViews.CreateCart);
routes.put('/updatecart',cusViews.UpdateCart);
routes.put('/confirmcart',cusViews.ConfirmCart);
routes.delete('/deletecart',cusViews.DeleteCart);
routes.get('/search',cusViews.SearchRestOrFood);
routes.post('/placeorder',cusViews.PlaceOrder);
routes.put('/cancelorder',cusViews.CancelOrder);

module.exports=routes;
