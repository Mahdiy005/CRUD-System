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
let delItem = document.querySelector("#delet-item");
let updateItem = document.querySelector("#update-item");
let delAll = document.querySelector(".delete-all");

if (window.localStorage.getItem("products")) {
  products = JSON.parse(window.localStorage.getItem("products"));
}
displayData();
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
  for (let i = 0; i < +mount.value; i++) {
    let productData = {
      title: title.value,
      price: price.value || 0,
      taxs: taxs.value || 0,
      ads: ads.value || 0,
      discount: discount.value || 0,
      cat: category.value || "Unknown",
    };
    products.push(productData);
  }
  console.log(products);
  window.localStorage.setItem("products", JSON.stringify(products));

  // display data
  displayData();

  // clear inputs
  clearInputs();

  // display delete all
  delAll.style.display = "block";
  delAll.children[0].innerHTML = products.length;
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
                  <td>${i + 1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxs}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].cat}</td>
                  <td><span id="update-item">update</span></td>
                  <td><span id="delet-item">delete</span></td>
                </tr>`;
    addedArea.innerHTML += productDiv;
  }
}

// delete item
document.querySelector("tbody").onclick = function (e) {
  if (e.target.id == "delet-item") {
    let currentIndex = Array.from(
      document.querySelectorAll("tbody tr")
    ).indexOf(e.target.parentElement.parentElement);
    products = products.filter((item, index) => {
      return !(index === currentIndex);
    });

    displayData();
    window.localStorage.setItem("products", JSON.stringify(products));
  }
};

// update button
document.querySelector("tbody").addEventListener("click", function (e) {
  if (e.target.id == "update-item") {
    document.querySelector(".update").style.left = "0";
    creatBtn.style.left = "100%";
    let currentIndex = Array.from(
      document.querySelectorAll("tbody tr")
    ).indexOf(e.target.parentElement.parentElement);
    title.value = products[currentIndex].title;
    price.value = products[currentIndex].price;
    taxs.value = products[currentIndex].taxs;
    ads.value = products[currentIndex].ads;
    discount.value = products[currentIndex].discount;
    category.value = products[currentIndex].cat;
    total.children[0].innerHTML =
      +price.value + +taxs.value + +ads.value - +discount.value;
    mount.style.pointerEvents = "none";
    mount.style.opacity = "0.6";
    // when click update button
    document.querySelector(".update").addEventListener("click", (e) => {
      document.querySelector(".update").style.left = "-103%";
      creatBtn.style.left = "0";
      mount.style.pointerEvents = "all";
      mount.style.opacity = "1";
      products[currentIndex].title = title.value;
      console.log(products[currentIndex].title);
      products[currentIndex].price = price.value;
      products[currentIndex].taxs = taxs.value;
      products[currentIndex].ads = ads.value;
      products[currentIndex].discount = discount.value;
      products[currentIndex].cat = category.value;
      displayData();
      window.localStorage.setItem("products", JSON.stringify(products));
      clearInputs();
    });
  }
});

// delete all items
delAll.onclick = function () {
  products = [];
  window.localStorage.setItem("products", JSON.stringify(products));
  displayData();
  delAll.style.display = "none";
};
