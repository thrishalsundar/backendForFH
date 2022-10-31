function RandGen(i){
    return Math.floor(Math.random()*10000).toString().padStart(i);
}


module.exports={RandGen};
