//todo
//controllers and rds in aws
const express=require("express")
const bodyParser=require('body-parser')
require("dotenv").config();



const app=express();
const routes=require('./routes/userRoutes');

//init
const port=process.env.PORT;

app.use(bodyParser.json());
app.use('/apis',routes);


function main(){

    app.listen(port)
    console.log("Server running on "+port+" successfully");

}

if (require.main==module){
    main();
}
