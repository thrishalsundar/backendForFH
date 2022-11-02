const bcrypt=require('bcrypt');
const saltRounds=10;



function HashIt(plainPassword) {

    const hashedPass=bcrypt.hashSync(plainPassword, saltRounds);
    return hashedPass;
    
}

function VerifyPass(passFromFE, hashFromBE){

    return bcrypt.compareSync(passFromFE, hashFromBE)

}

const passHelpers={HashIt,VerifyPass}

module.exports=passHelpers;
