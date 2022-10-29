const mysql=require("mysql");
const connection=mysql.createConnection({
    host:'localhost',
    user:'forTeam',
    password:'rmkpullingos',
    database:'forFH',
    port:3333
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
