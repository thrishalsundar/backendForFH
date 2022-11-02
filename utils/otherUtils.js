function RandGen(i){
    return Math.floor(Math.random()*10000).toString().padStart(i);
}


function tiOf(b) {
    return (b==false)?1:0
}


function arrToString(arr){
    let resStr="";

    for(const item of arr){
        resStr+='"'+item+'"'+',';
    }

    return resStr.substring(0,resStr.length-1);
}

module.exports={RandGen,tiOf,arrToString};
