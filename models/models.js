class Admin{
    constructor(obj){
        this.id="",
        this.name=obj.name,
        this.username=obj.username,
        this.password=obj.password
    }
}


class User{
    constructor(signupObj){
        this.id="",
        this.type=signupObj.type //customer,hotelUser,mover
        this.fName=signupObj.fName,
        this.lName=signupObj.lName,
        this.userId=signupObj.userId, //resId & moverId
        this.mobileNo=signupObj.mobileNo,
        this.password=signupObj.password,
        this.email=signupObj.email,
        this.address={},   //string in SQL    
        this.orderHistory=[], //historyStruct based on user -abt
        this.token="",
        this.refToken="",
        this.ordersLeft=[],  //abt
        this.available=false,
        this.lastLogin=new Date();
    }

    SignupValidator(){
        if(this.type=="" || this.fName=="" || this.lName=="" || this.userId=="" || this.password=="" || this.mobileNo=="" || this.email=="") return false;
        return true;
    }

    LoginValidator(){
        if(this.userId=="" && this.mobileNo=="" && this.email=="") return false;
        if(this.password=="") return false;
        return true;
    }
}

class Address{
    constructor(obj){
        this.id=id,
        this.addId=obj.addId,
        this.userId=obj.userId,
        this.houseNo=obj.houseNo,
        this.streetName=obj.streetName,
        this.landmark=obj.landmark,
        this.city=obj.city,
        this.state=obj.state,
        this.pincode=obj.pincode
    }
}

class Restaurant{
    
    constructor(){
        this.id="",
        this.displayName="",
        this.branch="",
        this.resId="",  //resUserName
        this.email="",
        this.address={},  //str
        this.foodsAvail=[ 
            //        { foodId:"", inStock:false } 
        ],     //abt
        this.logoUrl="",
        this.website="",
        this.openStat=false,
        this.oTime=new Date(),
        this.cTime=new Date(),
        this.rating=0,
        this.reviews=[]    //abt
    }

}

class FoodItem{

    constructor(resId,foodItemObj){
        this.id="",
        this.foodId=foodName+resId,
        this.displayName=foodItemObj.displayName,
        this.resId=resId, //hotelid  resusername
        //this.calories="",
        this.categoryType=foodItemObj.categoryType,
        this.cuisineType=foodItemObj.cuisineType,
        this.isVeg=foodItemObj.isVeg,
        this.description=foodItemObj.description,
        this.amount=foodItemObj.amount,
        this.contents=foodItemObj.contents,
        this.instock=false, 
        this.rating=0,
        this.image=foodItemObj.image,
        this.reviews=[]  //abt
    }
}

class Cart{
    constructor(cst,rst,time){
        this.id="",
        this.cartId=cst+rst+time;
        this.cartContents=[],  
        this.total=0,
        this.cusId=cst,
        this.resId=rst,
        this.confirmStat=false,
        this.createdAt= new Date()
    }

    CartValidator(){
        if(this.cartId==='' || this.cusId==='' || this.resId==='' ) return false;
        return true;
    }
}

class OrderItem{
    constructor(foodId,count,cartId){
        this.id="",
        this.foodItem=foodId,
        this.count=count,
        this.itemTotal=0,
        this.cartId=cartId
    }
}

class Order{
    constructor(cartId,name,mobileNo){
        this.id="",
        this.orderId=cartId,
        this.cusId="", //userid
        this.name=name,
        this.cartId=cartId,
        this.movId="",
        this.secretId="",  //after out4delivery
        this.orderedAt=new Date(),
        this.orderStat="ini",   // ini:cus,cooked:res,out4delivery:mov,delivered:mov
        this.mobileNo=mobileNo,
        this.discount=0,
        this.tax=0,
        this.total=0
    }

    FillCartDets(cartObj){
        this.cusId=cartObj.cartId;
        this.total=cartObj.total
    }


    OrderValidator(){
        if(this.cartId==='' ||  this.name==='' || this.mobileNo==='') return false;
        return true;
    }
}

class Payment{
    constructor(){
        this.id="",
        this.payId="",
        this.method="",
        this.orderId="",
        this.payStatus="",
        this.total=0

    }
}

class Review{
    constructor(){
        this.id="",
        this.revId="",
        this.type="",
        this.from="",
        this.to="",
        this.rating=0,
        this.comments="",
        this.revDate=new Date()
    }
}

module.exports={User,Order,FoodItem,Admin,Address,Restaurant,Cart,OrderItem,Payment,Review}
