// selectors
let creatBtn = document.querySelector(".creat");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxs = document.querySelector("#taxs");
let ads = document.querySelector("#ads");
let mount = document.querySelector("#mount");
let category = document.querySelector("#category");
let discount = document.querySelector("#discount");
let totalPriceArea = document.querySelector(".total span");
let addedArea = document.querySelector("tbody");
let sequenceIndex = 0;
let allInputs = document.querySelectorAll(".inputs input");
let total = culculateProductPrice();
let products = [];


// add culculate price whn input 
allInputs.forEach(input=> {
  input.oninput = function () {
    if(price.value && taxs.value && ads.value)
      totalPriceArea.innerHTML = +price.value + +taxs.value + +ads.value - discount.value;
    else {
      totalPriceArea.innerHTML = "";
    }
  } 
})
// add data when click button create
creatBtn.onclick = function () {
  addProductToTable();
  allInputs.forEach((input) => (input.value = ""));
  totalPriceArea.innerHTML = "";
  console.log(products);
};

// functions
// calculate price of the product
function culculateProductPrice() {
  return +price.value + +taxs.value + +ads.value - +discount.value;
}
function addProductToTable() {
  let titleVal = title.value;
  let mountVal = mount.value;
  let catVal = mount.value;
  let total = culculateProductPrice()
  let allTotalInputs = document.querySelectorAll(".counting input")
  if (document.querySelectorAll("tbody tr")) {
    sequenceIndex = document.querySelectorAll("tbody tr").length;
  } else {
    sequenceIndex = 0;
  }
  for (let i = sequenceIndex; i < sequenceIndex + +mountVal; i++) {
    let productData = `<tr>
                  <td>${i + 1}</td>
                  <td>${titleVal}</td>
                  <td>${total}</td>
                  <td>${taxs.value}</td>
                  <td>${ads.value}</td>
                  <td>${discount.value}</td>
                  <td>${catVal}</td>
                  <td><span id="update-item">update</span></td>
                  <td><span id="delet-item">delete</span></td>
                </tr>`;
    addedArea.innerHTML += productData;
    let productInfo = {
      id: i+1,
      title: titleVal,
      salary: total,
      tax: taxs.value,
      adsense: ads.value,
      disco: discount.value,
      cat: catVal
    }
    products.push(productInfo)
  }
}

