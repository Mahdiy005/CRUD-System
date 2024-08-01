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
let delAllBtn = document.querySelector(".delete-all");
let deletItemBtn = document.querySelector(".delet-item");

// check if there is exist data in local storage
if (window.localStorage.getItem("products")) {
  let dataFromLocalStorage = JSON.parse(
    window.localStorage.getItem("products")
  );
  // console.log(dataFromLocalStorage);

  dataFromLocalStorage.forEach((item) => {
    products.push(item);
  });
  // appear delete all button
  delAllBtn.style.display = "block";
  delAllBtn.children[0].innerHTML = products.length;
  dataFromLocalStorage.forEach((item) => {
    let productData = `<tr>
                  <td>${item.id}</td>
                  <td>${item.title}</td>
                  <td>${item.salary}</td>
                  <td>${item.tax}</td>
                  <td>${item.adsense}</td>
                  <td>${item.disco}</td>
                  <td>${item.cat}</td>
                  <td><span id="update-item">update</span></td>
                  <td><span id="delet-item">delete</span></td>
                </tr>`;
    addedArea.innerHTML += productData;
  });
  console.log(dataFromLocalStorage[dataFromLocalStorage.length]);
  sequenceIndex = dataFromLocalStorage.length;
}

// add culculate price whn input
allInputs.forEach((input) => {
  input.oninput = function () {
    if (price.value && taxs.value && ads.value)
      totalPriceArea.innerHTML =
        +price.value + +taxs.value + +ads.value - discount.value;
    else {
      totalPriceArea.innerHTML = "";
    }
  };
});
// add data when click button create
creatBtn.onclick = function () {
  addProductToTable();
  allInputs.forEach((input) => (input.value = ""));
  totalPriceArea.innerHTML = "";
  addToLocal();
  if (products) {
    delAllBtn.style.display = "block";
    delAllBtn.children[0].innerHTML = products.length;
  }
};

// functions
// calculate price of the product
function culculateProductPrice() {
  return +price.value + +taxs.value + +ads.value - +discount.value;
}
// display data into page
function addProductToTable() {
  let titleVal = title.value;
  let mountVal = mount.value;
  let catVal = category.value;
  let total = culculateProductPrice();
  let allTotalInputs = document.querySelectorAll(".counting input");
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
      id: i + 1,
      title: titleVal,
      salary: total,
      tax: taxs.value,
      adsense: ads.value,
      disco: discount.value,
      cat: catVal,
    };
    products.push(productInfo);
  }
}

// add to local storage
function addToLocal() {
  window.localStorage.setItem("products", JSON.stringify(products));
}

// delet all logic
delAllBtn.onclick = function () {
  products = [];
  window.localStorage.removeItem("products");
  window.location.reload();
};

// handle delet item btn
addedArea.onclick = function (e) {
  console.log(e.target);
  if (e.target.id === "delet-item") {
    e.target.parentElement.parentElement.remove();
    console.log(e.target.id);
    products.splice(+(e.target.parentElement.parentElement.id) - 1,1)
    addToLocal()
  }
  console.log(products[products.length - 1].id);
};
