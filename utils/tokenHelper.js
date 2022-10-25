function CreateToken(email,phone){
    return email+phone+(new Date()).toDateString;
}

function UpdateToken(email,phone){
    return CreateToken(email,phone);
}

const tokenHelpers={CreateToken,UpdateToken}

module.exports=tokenHelpers;

