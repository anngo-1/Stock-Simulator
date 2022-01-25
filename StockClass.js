class Stock {
 
  constructor (stockname, stockprice, stockbehavior) {
    this.buyquantity = 1;
    this.name = stockname;
    this.price = stockprice;
    this.oldprice = stockprice;
    this.originalprice = stockprice;
    this.behavior = stockbehavior;
    this.quantity = 0;
  }

  updatebuy (buyquantitys){
    this.buyquantity = buyquantitys;
  }

  buyquantities(){
    return this.buyquantity;
  }
  sell(updatetext,sellquantity) {
    if (this.quantity-sellquantity >= 0) {
      this.quantity-=sellquantity;
      balance+=Math.round(this.price*sellquantity);
      updatetext(this.holding());
    } else {
      alert("you cannot sell any more " + this.name + " stock (no shares).");
    }
  }

  buy(updatetext, buyquantity) {
    console.log(this.price);
    console.log(buyquantity);
    buyquantity = parseInt(buyquantity);
    if (balance-Math.round(this.price*buyquantity) >= 0) {
    this.quantity +=buyquantity; 
    balance -= this.price*buyquantity;
    updatetext(this.holding());
    } else {
      alert("you do not have enough funds for this transaction" + " ($" + Math.abs(balance-this.price*buyquantity)  + " needed.)");
    }
  }

  price () {
    return Math.round(this.price);
  }

  holding () {
    return Math.round(this.price*this.quantity);
  }

  names () {         
    return this.name;
  }

  adv () {
    this.oldprice = this.price;


  
    if (this.behavior == "high") {

      let x = Math.floor((Math.random() * 100) + 1);
      let floorvalue = this.originalprice /  Math.floor((Math.random() * 5) + 1);
      let randomvalue = (Math.floor((Math.random() * 10) + 1) + 30);

      if (x < 80) {
        this.price = this.price + ((this.originalprice / 100) * randomvalue);
      }
      if (x > 80) {
        this.price = this.price - (((this.originalprice / 60) * randomvalue) + (this.price / 10));
        if (this.price < 0) {
          console.log("ran")
          this.price = floorvalue;
        }
      }

    }

    if (this.behavior == "low") {
      let x = Math.floor((Math.random() * 100) + 1);
      let randomvalue = (Math.floor((Math.random() * 4) + 1) + 1);
      let floorvalue = this.originalprice /  Math.floor((Math.random() * 5) + 1);
      if (x < 75) {
        this.price = this.price + ((this.originalprice / 100) * randomvalue);
      }
      if (x > 75) {
        this.price = this.price - (((this.originalprice / 60) * randomvalue) + (this.price / 80));
        if (this.price < 0) {
          console.log("ran")
          this.price = floorvalue;
        }
      }
    }
  
    if (this.behavior == "random") {
      let x = Math.floor((Math.random() * 100) + 1);
      let randomvalue = (Math.floor((Math.random() * 80) + 1) + 20);
      let floorvalue = this.originalprice /  Math.floor((Math.random() * 5) + 1);

      if (x < 50) {
        this.price = this.price + ((this.originalprice / 100) * randomvalue);
      }
      if (x > 50) {
        this.price = this.price - ((this.originalprice / 100) * randomvalue);
        if (this.price < 0) {
          console.log("ran")
          this.price = floorvalue;
        }
      }
    }

    if (this.behavior == "trash") {
      let x = Math.floor((Math.random() * 100) + 1);
      let randomvalue = (Math.floor((Math.random() *3) + 1));
      let floorvalue = this.originalprice /  Math.floor((Math.random() * 5) + 1);
      if (x < 60) {
        this.price = this.price + (this.price / 40);
      }
      if (x > 60) {
        this.price = this.price - (this.originalprice / 15);
        if (this.price < 22) {
          console.log("ran");
          this.price = 22;
        }
      }
      
    }
    
  }

  quantity() {
    return this.quantity;
  }

  increase () {
   let decreaseValue = this.oldprice - this.price;
   let x = (-1*(decreaseValue / this.oldprice) * 100);
   let y = ((Math.round(x * 10))/10);

  return y;

  

  }

  print() {
    return (this.name + "\r\n" + "Stock price per share: $" + Math.round(this.price) + " (" + this.increase() + "%)" + "\r\n" + "Current holding worth: $" + Math.round(this.holding()) + " (Holding " + this.quantity + " " + this.name + " shares)"); 
  }

}
