function HashIt(plainPassword) {

    hashedPass=plainPassword+"ISHASHED";
    return hashedPass;
    
}

function VerifyPass(passFromFE, hashFromBE){

    hashedPass=passFromFE+"ISHASHED";
    if(hashedPass==hashFromBE){
        return true;
    }
    return false;

}

const passHelpers={HashIt,VerifyPass}

module.exports=passHelpers;