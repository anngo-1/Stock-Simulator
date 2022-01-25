// get elements
const quantity = document.getElementById("fname");
const quantity1 = document.getElementById("fname1");
const quantity2 = document.getElementById("fname2");
const quantity3 = document.getElementById("fname3");
const quantity4 = document.getElementById("fname4");
const quantity5 = document.getElementById("fname5");



var quantarr = [quantity,quantity1,quantity2,quantity3,quantity4,quantity5];

const next = document.getElementById("kk");
const buyoso = document.getElementById("buyoso");
const buytelsa = document.getElementById("buytelsa");
const buymvidia = document.getElementById("buymvidia");
const buygooble = document.getElementById("buygooble");
const buypear = document.getElementById("buypear");
const buydesney = document.getElementById("buydesney");

const selloso = document.getElementById("selloso");
const selltelsa = document.getElementById("selltelsa");
const sellmvidia = document.getElementById("sellmvidia");
const sellgooble = document.getElementById("sellgooble");
const sellpear = document.getElementById("sellpear");
const selldesney = document.getElementById("selldesney");


const ctx = document.getElementById("income").getContext('2d');


const osostocktext = document.querySelector('.Stocks');
const balancetext = document.querySelector('.Balance');
const stock1 = document.querySelector('.Stocks1');
const stock2 = document.querySelector('.Stocks2');
const stock3 = document.querySelector('.Stocks3');
const stock4 = document.querySelector('.Stocks4');
const stock5 = document.querySelector('.Stocks5');
var balance = 0;
var day = 0;
var s = sessionStorage.getItem("oso");
var balance = parseInt(s);
var initial = balance;



// stock creation syntax --> name,price, behavior (random, high, low, trash)
// making stocks
const modemastock = new Stock("Modema", 53, "trash");
const telsastock = new Stock("Telsa", 1530, "high");
const mvidiastock = new Stock("Mvidia", 528, "low");
const gooblestock = new Stock("Gooble", 2745, "high");
const pearstock = new Stock("Pear", 912, "random");
const disneystock = new Stock("Desney", 121, "low");
// stock array (for future multiple stocks)
const stocks = [modemastock, telsastock, mvidiastock, gooblestock, pearstock, disneystock];



// ease of use functions


function quantities (stocksarr, quantarr) {
  
  for (let i = 0; i<stocksarr.length;i++) {
    stocksarr[i].updatebuy(quantarr[i].value);
    console.log(stocksarr[i].names() + " " + stocksarr[i].buyquantities());
}
}
for (let i = 0; i<quantarr.length;i++) {
  quantarr[i].value = 1;
  quantarr[i].addEventListener('change', function() {
    quantities(stocks,quantarr);
  });
}
// initial call to set to 1
quantities(stocks,quantarr);

function updatetext(holding) { //update text functions changed color and text of elements also if up/down
  let inc;
 if (disneystock.increase() > 0) {
   stock5.style.color = "#27dd02";
 } else if (disneystock.increase() < 0) {
   stock5.style.color = "#fc0404";
 }

 if (pearstock.increase() > 0) {
   stock4.style.color = "#27dd02";
 } else if (pearstock.increase() < 0) {
   stock4.style.color = "#fc0404";
 }

  if (gooblestock.increase() > 0) {
   stock3.style.color = "#27dd02";
 } else if (gooblestock.increase() < 0) {
   stock3.style.color = "#fc0404";
 }

  if (mvidiastock.increase() > 0) {
   stock2.style.color = "#27dd02";
 } else if (mvidiastock.increase() < 0){
   stock2.style.color = "#fc0404";
 }

  if (telsastock.increase() > 0) {
   stock1.style.color = "#27dd02";
 } else if (telsastock.increase() < 0){
   stock1.style.color = "#fc0404";
 }

  if (modemastock.increase() > 0) {
   osostocktext.style.color = "#27dd02";
 } else if (modemastock.increase() < 0){
   osostocktext.style.color = "#fc0404";
 }

// spam text content to display beginning prices, holding worth, and holding shares
stock5.textContent = disneystock.print();  
stock4.textContent = pearstock.print();
stock3.textContent = gooblestock.print();
stock2.textContent = mvidiastock.print();
stock1.textContent = telsastock.print();
osostocktext.textContent = (modemastock.print());

if ( ((balance+holding)-initial) > 0) {
  let inc1 = ((balance+holding)-initial);
  let num = ((Math.round(inc1 * 10))/10);
  
  inc = "+$" + num;
} else {
  let inc1 = ((balance+holding)-initial);
  let num = ((Math.round(inc1 * 10))/10);
  
  inc = "-$" + (-1*num);

}
balancetext.textContent = ("net balance: $" +Math.round(balance+holding) + " (" + increases(initial,balance+holding) +"%, gain/loss " + inc + ")" + "\r\n" + " ($" + (Math.round(holding)) + " in stock, $" + Math.round(balance) + " available.)");
}


updatetext(0); // initial call


function increases(initial, now) {
  let decreaseValue = initial - now;
   let x = (-1*(decreaseValue / initial) * 100);
   let y = ((Math.round(x * 10))/10);

  return y;
}

//chart stuff

var balances = [];

var income = new Chart(ctx, {
  type:"line",
  data: {
    labels: day,
    datasets: [
      {
        label: "Net Worth",
        data: balances,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "grey",
        borderWidth: 3,
        lineTension:  0.4,
      
      
      }
    ]
    
  
  }, //chart options 
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { //create ticks 
                ticks: {
                   callback: function(value, index, values) {
                        return '$' + value;
                   }

              }
    
            },
              x: {
                ticks: {
                       callback: function(value, index, values) {
                        return 'Day ' + index;
                   }
              
                }
              }
        }
          }
 
});

// update chart after everyday with new balance/day
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}



// initial call to initialize chart at day 0 with initial balance
addData(income, 0,+(balance));




// next day button/function pass in update text

function nextday(updatetext) {
 let holdingbal = 0; 

day++;
for (let i = 0; i<stocks.length;i++) {
  stocks[i].adv();
  holdingbal += stocks[i].holding(); 
  // go thru each stock in array and advance the price + add their price to the holding balance
  stocks[i].print();
  console.log(stocks[i].buyquantity);

}
//check if networth all time is lower than initial, if lower change to red, if higher change to green
if (balance+holdingbal > initial) {
 income.data.datasets[0].borderColor = 'green';
 income.update();
} else if (balance+holdingbal < initial) {
  income.data.datasets[0].borderColor = 'red';
 income.update();
} else {
    income.data.datasets[0].borderColor = 'grey';
 income.update();
}
updatetext(holdingbal); 
console.log(balance+holdingbal); //debug
addData(income,day,Math.round(balance+holdingbal));
 
//debug
console.log("current net worth as of day " + day + ": " + (balance+holdingbal));
}



// onclicks
selldesney.onclick = function(){disneystock.sell(updatetext,disneystock.buyquantities())};
sellpear.onclick = function(){pearstock.sell(updatetext,pearstock.buyquantities())};
sellgooble.onclick = function(){gooblestock.sell(updatetext,gooblestock.buyquantities())};
sellmvidia.onclick = function(){mvidiastock.sell(updatetext,mvidiastock.buyquantities())};
selltelsa.onclick = function(){telsastock.sell(updatetext,telsastock.buyquantities())};
selloso.onclick = function(){modemastock.sell(updatetext,modemastock.buyquantities())};
buytelsa.onclick = function() {telsastock.buy(updatetext,telsastock.buyquantities())}
buygooble.onclick = function() {gooblestock.buy(updatetext,gooblestock.buyquantities())}
buypear.onclick = function() {pearstock.buy(updatetext,pearstock.buyquantities())}
buymvidia.onclick = function() {mvidiastock.buy(updatetext,mvidiastock.buyquantities())}
buydesney.onclick = function() {disneystock.buy(updatetext,disneystock.buyquantities())}

buyoso.onclick = function() {modemastock.buy(updatetext, modemastock.buyquantities())}
next.onclick = function () {nextday(updatetext)};