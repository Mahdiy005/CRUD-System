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
let updateItemBtn = document.querySelector("#update-item");
let delAll = document.querySelector(".delete-all");
let mood = "create";
let temp;

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
  let productData = {
    title: title.value,
    price: price.value || 0,
    taxs: taxs.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    cat: category.value || "Unknown",
  };
  if (title.value && price.value && mount.value < 100 && category.value) {
    if (mood === "create") {
      if (+mount.value > 1) {
        for (let i = 0; i < mount.value; i++) {
          products.push(productData);
        }
      } else {
        products.push(productData);
      }
    } else {
      products[temp] = productData;
      mood = "create";
      creatBtn.innerHTML = "Create";
      mount.style.pointerEvents = "all";
      mount.style.cursor = "auto";
      mount.style.opacity = "1";
    }
      // clear inputs
  clearInputs();
  }

  window.localStorage.setItem("products", JSON.stringify(products));

  // display data
  displayData();



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
    let productDiv = `
                <tr>
                  <td scop="row">${i + 1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxs}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].cat}</td>
                  <td><span onclick="updateItem(${i})" id="update-item">update</span></td>
                  <td><span  id="delet-item">delete</span></td>
                </tr>`;
    addedArea.innerHTML += productDiv;
  }
  if (products.length > 0) {
    delAll.style.display = "block";
    delAll.children[0].innerHTML = products.length;
  } else {
    delAll.style.display = "none";
  }
  window.localStorage.setItem("products", JSON.stringify(products));
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

function updateItem(i) {
  creatBtn.innerHTML = "Update";
  title.value = products[i].title;
  price.value = products[i].price;
  taxs.value = products[i].taxs;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].cat;
  total.children[0].innerHTML =
    +price.value + +taxs.value + +ads.value - +discount.value;
  mount.style.pointerEvents = "none";
  mount.style.opacity = "0.6";
  mount.style.cursor = "no-drop";
  temp = i;
  mood = "update";
  window.scrollTo({
    behavior: "smooth",
    top: "0",
  });
}

// delete all items
delAll.onclick = function () {
  products = [];
  window.localStorage.setItem("products", JSON.stringify(products));
  displayData();
};

// search handling
let searchMood = "title";
let searchOptionsBtn = document.querySelectorAll(".search-by-btns button");
searchOptionsBtn.forEach((btn) => {
  btn.addEventListener("click", function () {

    if (this.className === "by-title") {
      searchMood = "title";
      document.querySelector("#search").placeholder = "search by title";
    } else {
      searchMood = "category";
      document.querySelector("#search").placeholder = "search by category";
    }
    document.querySelector("#search").focus();
    document.querySelector('#search').value=""
    displayData()
  });
});

document.querySelector("#search").oninput = function () {
  let addedArea = document.querySelector("tbody");
  addedArea.innerHTML = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(this.value)) {
        let productDiv = `
                <tr>
                  <td scop="row">${i + 1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxs}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].cat}</td>
                  <td><span onclick="updateItem(${i})" id="update-item">update</span></td>
                  <td><span  id="delet-item">delete</span></td>
                </tr>`;
        addedArea.innerHTML += productDiv;
      }
    }
  } else {
    let regex = new RegExp(this.value,"ig");
    for (let i = 0; i < products.length; i++) {
      if (regex.test(products[i].cat)) {
        let productDiv = `
                <tr>
                  <td scop="row">${i + 1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxs}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].cat}</td>
                  <td><span onclick="updateItem(${i})" id="update-item">update</span></td>
                  <td><span  id="delet-item">delete</span></td>
                </tr>`;
        addedArea.innerHTML += productDiv;
      }
    }
  }
};
