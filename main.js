// selct all inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let mount = document.getElementById("mount");
let category = document.getElementById("category");
let total = document.querySelector(".total");
let culculationFeilds = document.querySelectorAll(".counting input");
let creatBtn = document.querySelector(".creat");
let products = [];
let delItem = document.querySelector("#delet-item")
let updateItem = document.querySelector("#update-item")
let delAll = document.querySelector(".delete-all")



if (window.localStorage.getItem("products")) {
  products = JSON.parse(window.localStorage.getItem("products"));
  displayData()
}
// culc price of product
culculationFeilds.forEach((input) => {
  input.addEventListener("input", function () {
    if (price.value) {
      total.children[0].innerHTML =
        +price.value + +taxs.value + +ads.value - +discount.value;
    } else {
      total.children[0].innerHTML = "0";
    }
  });
});

// handle data and store it into local storage
creatBtn.onclick = function () {
  for(let i = 0; i < +mount.value ; i++) {
    let productData = {
      title: title.value,
      price: price.value,
      taxs: taxs.value,
      ads: ads.value,
      discount: discount.value,
      cat: category.value
    };
    products.push(productData);
  }
  console.log(products);
  window.localStorage.setItem("products", JSON.stringify(products));

  // display data
  displayData();

  // clear inputs
  clearInputs();


};

// clear all fields
function clearInputs() {
  let allFeilds = document.querySelectorAll(".inputs input");
  allFeilds.forEach((item) => {
    item.value = "";
  });
  total.children[0].innerHTML = "0";
}

// display data
function displayData() {
  let addedArea = document.querySelector("tbody");
  addedArea.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let productDiv = `<tr>
                  <td>${i+1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxs}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].cat}</td>
                  <td><span id="update-item">update</span></td>
                  <td><span id="delet-item">delete</span></td>
                </tr>`
  addedArea.innerHTML += productDiv;
  }
}


// delete item 
document.querySelector("tbody").onclick = function (e) {
  if(e.target.id == "delet-item") {
    let currentIndex = Array.from(document.querySelectorAll("tbody tr")).indexOf(e.target.parentElement.parentElement);
    products = products.filter((item,index)=> {
      return !(index === currentIndex)
    });
    
    displayData()
  window.localStorage.setItem("products", JSON.stringify(products));
  }
}

// delete all items 
delAll.onclick = function () {
  products = [];
  window.localStorage.setItem("products", JSON.stringify(products));
  displayData()
}