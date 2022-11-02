const mysql=require("mysql");
const connection=mysql.createConnection({
    host:'localhost',
    user: process.env.SQL_USER,
    password:process.env.SQL_PWD,
    database:process.env.SQL_DB,
    port:process.env.SQL_PORT,
});


// connection.connect();

// connection.query('SELECT * from hotels',(error,results,fields)=>{
//     if(error) throw error;
//     console.log(results[0].hotelName);
// })

function doThis(qString){
    return new Promise(function(resolve, reject){
        connection.query(qString,  (error, results,fields)=>{
            if(error){
                return reject(error)
            }
            const fin={error,results,fields}
            return resolve(fin);
        });
    });
};

const dbFeats={connection,doThis}
module.exports=dbFeats;
