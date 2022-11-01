const express=require('express');
const adminViews=require('../controllers/adminViews');

const routes=express.Router();

routes.get('/foods',adminViews.GetFoods);
routes.get('/rests',adminViews.GetRests);
routes.post('/newrest',adminViews.CreateRestaurant);
routes.post('/newcuser',adminViews.NewCusUser);
routes.post('/newruser',adminViews.NewResUser);
routes.post('/newmuser',adminViews.NewMovUser);
routes.delete('/remrest',adminViews.DeleteRestaurant);
routes.delete('/remruser',adminViews.DeleteCusUser);
routes.delete('/remruser',adminViews.DeleteResUser);
routes.delete('/remmuser',adminViews.DeleteMovUser);
routes.get('/searchrest',adminViews.SearchRest);
routes.get('/searchfood',adminViews.SearchFood);

module.exports=routes;
//GetFoods
//GetRests
//CreateRestaurant
//NewCusUser
//NewResUser
//NewMovUser
//DeleteRestaurant
//DeleteCusUser
//DeleteResUser
//DeleteMovUser
//SearchRest
//SearchFood



