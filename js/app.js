// swiper js
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});

// dom nodes
let productList = document.getElementById("product-list");
let productCategories = document.getElementById("product-categories");
let article = document.querySelector("article");
let features = document.querySelector(".features");
let main = document.querySelector("main");
const header = document.querySelector("header");
let badge = document.getElementById("badge");
let footer = document.querySelector("footer");

let Favorites = [];

// fetching

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => render(data))
  .catch((error) => console.log(error));

let flag = true;
function render(list) {
  article.classList.remove("d-none");
  features.classList.remove("d-none");
  badge.textContent = Favorites.length;

  let temp = list.map((item) => {
    return `
    <div class="product-card">
                              <div class="product-card-img">
                                  <img src="${
                                    item.image
                                  }" alt="Couldn't be shown" class="img-fluid">
                              </div>
                              <div class="product-card-body">
                                  <p class="product-brand">${item.category}</p>
                                  <h5 class="product-name">
                                   ${item.title}
                                  </h5>
                                  <div>
                                      <span class="selling-price">${
                                        item.price
                                      } $</span>
                                  </div>
                                  <div class="mt-2">
                                      ${
                                        !Favorites.find(
                                          (itemB) => itemB.id == item.id
                                        )
                                          ? `<button class="btn btn1" onclick="handleAdd(${item.id})">Add To Basket</button>`
                                          : `<span class="badge p-2 bg-dark">item added</span>`
                                      }
                                     
                                  </div>
                              </div>
          </div>    
      
      `;
  });
  productList.innerHTML = temp.join("");
}
const handleSearch = (event) => {
  let value = event.target.value;
  // console.log(value);
  let resultOfSearch = DATAS.filter((item) => item.title.search(value) > -1);
  render(resultOfSearch);
};
const handleAdd = (itemId) => {
  //   debugger;

  let filteredItem = DATAS.find((item) => item.id === +itemId);
  Favorites.push(filteredItem);
  console.log(Favorites);
  render(DATAS);
};
const handleBack = () => {
  location.reload();
};

const handleRemove = (itemId) => {
  let newTemp = Favorites.filter((item) => item.id !== itemId);
  Favorites = newTemp;
  badge.textContent = Favorites.length;

  renderBasket();
};

const renderBasket = () => {
  article.classList.add("d-none");
  features.classList.add("d-none");
  header.classList.remove("fixed-top");
  footer.classList.add("d-none");

  main.innerHTML = "";
  let temp = Favorites.map((item) => {
    return `
     <div class="d-flex justify-content-between align-items-center w-100 p-3 basket-wrapper">
                                  <img src="${item.image}" alt="Couldn't be shown" class="img-fluid basket-img">
                        
                                  <p class="product-brand">${item.category}</p>
                                  <h5 class="product-name">
                                   ${item.title}
                                  </h5>z
                                  
                                      <span class="selling-price">${item.price} $</span>
                                  
                                 
                                      <button class="btn btn-danger" onclick="handleRemove(${item.id})">Remove from Basket</button>
                                     
                                 
                             
          </div>  
    `;
  }).join("");
  let section = `<section class="d-flex justify-content-center align-items-center flex-column">
  <button class="btn btn-info" onclick="handleBack()">Back To Home</button>
  ${temp}
  </section>
  `;
  main.innerHTML = section;
};
