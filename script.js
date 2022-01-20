
const box = document.getElementById("name");
const enterButton = document.getElementById("CheckStocksButton");
const div = document.getElementById("EnterStockCheck");

var check = true;
var balance =  0;
var income = 0;

// enter button function
function play1() {

  var x = box.value;
  
  console.log(x);
  x = parseInt(x);
  if (x <= 0) {
    enterButton.style.display = "none";
    div.style.display = "none";
    alert("you buggin");
  }
  else {
    income = x;
    enterButton.style.display = "block";
    div.style.display = "block";
    console.log(Number.isInteger(x));

    sessionStorage.setItem("oso", x);
  }
  
}

box.addEventListener('change', play1);






