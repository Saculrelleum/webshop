let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let content = document.getElementById("content-el");


let basket = JSON.parse(localStorage.getItem("data")) || [];
// let clothatributes = JSON.parse(localStorage.getItem("clothatributes")) || [];
// console.log(clothatributes);

removeall = () => {
  basket = [];
  clothatributes = [];
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("clothatributes", JSON.stringify(clothatributes));
  ShoppingCart.innerHTML = "";
  calculation();
};






let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();





let generateCartItems = () => {
  if (basket.length !== 0 /* && clothatributes.length !== 0 */ ) {
    return (ShoppingCart.innerHTML = basket // && clothatributes
      .map((x) => {
        let { id, item, size, color } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
        <div class="cart-container">
      <div class="cart-item">
      <img class="cart-pic" src=${color} alt="" />
      
      <div class="details-cart">
      
      <div class="title-price-x">
      <h4 class="title-price">
      <p>${name}</p>
      <p class="cart-item-price">${item * price} €  Größe: ${size}  </p>
      </h4>
      <i onclick="removeItem(${id})"class="close-el">x</i>
      </div>  
      <p class="cart-desc"> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <div class="cart-buttons">
      <div class="buttons">
      <i onclick="decrement(${id})" class="dash-el">-</i>
      <div id=${id} class="quantity">${item}</div>
      <i onclick="increment(${id})" class="plus-el">+</i>
      </div>
      </div>
      </div>  
      </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.style.display = "none";
    content.style.display = "block";
    label.innerHTML = `
    <h2>Keine Artikel vorhanden</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();



let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};


let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};



let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <div class="totalbill-container"> <h2>Summe: (${basket.length} Artikel)  ${amount} €</h2>
    <button onclick="checkOut()" class="checkout">Checkout</button>
    </div>
    <div class="adress-container">
    <div class="adress-container2">
    <h2 class="adress-title">Adresse</h2>
    <i class="option-el"> <img id="myBtn" src="images/option.svg" alt="" /></i>
    </div>


    <!-- The Modal -->
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <p> Bitte geben Sie Ihre Adresse ein</p>
        <input type="text" id="name" placeholder="Name">
        <input type="text" id="adress" placeholder="Adresse">
        <input type="text" id="plz" placeholder="PLZ">
        <input type="text" id="ort" placeholder="Ort">
        <button onclick="adress()" class="adressBtn">Speichern</button>

      </div>
      </div>
      <div class="adress-list">
      <p id="nameText">Lucas Müller</p>
      <p id="adressText">Bussardweg 10</p>
      <p id="plzText">23966, Wismar</p>
      </div>
    </div>
    
    `);
  } else return;
};


TotalAmount();




var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function adress() {
  let name = document.getElementById("name").value;
  let adress = document.getElementById("adress").value;
  let plz = document.getElementById("plz").value;
  let ort = document.getElementById("ort").value;
  document.getElementById("nameText").textContent = name;
  document.getElementById("adressText").textContent = adress;
  document.getElementById("plzText").textContent = plz + ", " + ort;
  modal.style.display = "none";
}

function checkOut() {
 if (basket.length !== 0) {
    alert("Vielen Dank für Ihre Bestellung!");
  } else {
    alert("Bitte wählen Sie mindestens ein Produkt aus");
  }
}