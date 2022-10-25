class Respond{
    constructor(data,error,msg,stat){
        this.data=data
        this.error=error
        this.msg=msg
        this.stat=stat
    }
    static statusNotFound={
        error:"Status Not Found",
        stat:404
    }
    static statusBadRequest={
        error:"Status Bad Request",
        stat:403,
    }

    static internalServerError={
        error:"Internal Server Error",
        stat:500,
    }
}



module.exports=Respond;
