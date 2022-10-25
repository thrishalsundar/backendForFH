class User{
    constructor(signupObj){
        this.id="",
        this.type=signupObj.type //customer,hotelUser,mover
        this.fName=signupObj.fName,
        this.lName=signupObj.lName,
        this.userId=signupObj.userId,
        this.mobileNo=signupObj.mobileNo,
        this.password=signupObj.password,
        this.email=signupObj.email,
        this.address="",
        this.orderHistory=[], //historyStruct based on user
        this.token="",
        this.refToken="",
        this.lastLogin=new Date();
    }

    SignupValidator(){
        if(this.type=="" || this.fName=="" || this.lName=="" || this.userId=="" || this.password=="" || this.mobileNo=="" || this.email=="") return false;
        return true;
    }

    LoginValidator(){
        if(this.userid=="" && this.mobileNo=="" && this.email=="") return false;
        if(this.password=="") return false;
        return true;
    }
}

class FoodHub{
    
    constructor(){
        this.id="",
        this.displayName="",
        this.email="",
        this.address="",
        this.foodsAvail=[ 
            //        { foodId:"", inStock:false } 
        ],
        this.logoUrl="",
        this.website="",
        this.openStat=false,
        this.oTime=new Date(),
        this.cTime=new Date(),
        this.rating=0,
        this.reviews=[]
    }
}

class FoodItem{

    constructor(){
        this.id="",
        this.displayName="",
        this.fromHotel="", //hotelid
        this.calories="",
        this.description="",
        this.amount="",
        this.contents=[
            // {name:"",count:""}
        ],        
        this.rating=0,
        this.reviews=[]
    }
}



class Order{
    constructor(){
        this.id="",
        this.by="", //userid
        this.orderedAt=new Date(),
        this.contents=[
            // {foodId:"",no:""}
        ],
        this.stat="",
        this.phone="",
        this.email=""
    }
}

module.exports={User,Order,FoodHub,FoodItem}
