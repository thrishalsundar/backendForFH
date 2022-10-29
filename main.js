const express=require("express")
const bodyParser=require('body-parser')
require("dotenv").config();
const app=express();
const VerifyToken=require('./middleware/verifyToken');


//routes
const authRoutes=require('./routes/authRoutes');
const cusRoutes=require('./routes/cusRoutes');
const resRoutes=require('./routes/resRoutes');
const movRoutes=require('./routes/movRoutes');


const port=process.env.PORT;

app.use(bodyParser.json());
app.use('/guest', authRoutes);
app.use('/res',VerifyToken,resRoutes);
app.use('/mov',VerifyToken,movRoutes);
app.use('/cus',VerifyToken,cusRoutes);


function main(){

    app.listen(port)
    console.log("Server running on "+port+" successfully");

}

if (require.main==module){
    main();
}
