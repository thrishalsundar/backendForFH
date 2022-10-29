const dbFeats=require('../database/dbSetup');
const Respond = require('../utils/respHelper');

async function GetFoods(){

    try{
        const dbResp=await dbFeats.doThis(`select * from foods`);
        return new Respond({data:dbResp.results},null,"Successful",200);
    }catch(err){
        console.log(err);
        return Respond.internalServerError;
    }

}

const cusServices={GetFoods}
module.exports=cusServices;
