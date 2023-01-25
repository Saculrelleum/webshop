let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let content = document.getElementById("content-el");


let basket = JSON.parse(localStorage.getItem("data")) || [];

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

removeall = () => {
    basket = [];
    clothatributes = [];
    localStorage.setItem("data", JSON.stringify(basket));
    localStorage.setItem("clothatributes", JSON.stringify(clothatributes));
    ShoppingCart.innerHTML = "";
    update();
};


let update = () => {
    let whole_amount = 0
    for (let i = 0; i < basket.length; i++) {
        whole_amount += parseInt(basket[i].amount)
    }
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = whole_amount.toString()
};

update()


let generateCartItems = () => {
    if (basket.length !== 0 /* && clothatributes.length !== 0 */) {
        return (ShoppingCart.innerHTML = basket // && clothatributes
            .map((x) => {
                let {id, color, size, pimid, amount,} = x;
                let search = shopItemsData.find(x => x.id === id)||[] ;
                let {img, price, name, desc} = search;
                return `
        <div class="cart-container">
      <div class="cart-item">
      <img class="cart-pic" src="${get_img(pimid, color)}" alt="" />

      <div class="details-cart">

      <div class="title-price-x">
      <h4 class="title-price">
      <p>${name}</p>
      <p class="cart-item-price">${price} €  Größe: ${Sizes_invert[size]}  </p>
      </h4>
      <i onclick="removeItem(${id}, ${color}, ${size})" class="close-el">x</i>
      </div>
      <p class="cart-desc">${desc}</p>
      <div class="cart-buttons">
      <div class="buttons">
      <i onclick="decrement(${id}, ${color}, ${size})" class="dash-el">-</i>
      <div id=${id} class="quantity">${amount}</div>
      <i onclick="increment(${id}, ${color}, ${size})" class="plus-el">+</i>
      <span>Gesamtpreis ${amount * price}€</span>
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


let increment = (id, color, size) => {
    id = id[0].id
    color = color.toString()
    size = size.toString()
    let search = basket.find((x) => x.id === id && x.color === color && x.size === size);

    if (search === undefined) {
        console.log("Das sollte eh nie passieren");
    } else {
        search.amount += 1;
    }

    generateCartItems();
    update();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id, color, size) => {
    id = id[0].id
    color = color.toString()
    size = size.toString()
    console.log(id, color, size)
    let search = basket.find((x) => x.id === id && x.color === color && x.size === size);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.amount -= 1;
    }

    update();
    TotalAmount();
    basket = basket.filter((x) => x.amount !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let removeItem = (id, color, size) => {
    console.log(id, color, size)
    if (HTMLCollection.prototype.isPrototypeOf(id))
        id = id[0].id
    else
        id = id.id
    color = color.toString()
    size = size.toString()
    basket = basket.filter((x) => !(x.id === id && x.color === color && x.size === size));
    update();
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};


let TotalAmount = () => {
    if (basket.length !== 0) {
        let whole_amount = basket
            .map((x) => {
                let {id, amount} = x;
                let filterData = shopItemsData.find((x) => x.id === id);
                return filterData.price * amount;
            })
            .reduce((x, y) => x + y, 0);

        let whole_item_cnt = basket
            .map((x) => {
                let {id, amount} = x;
                return amount;
            }).reduce((a, b) => a + b)
        return (label.innerHTML = `
    <div class="totalbill-container"> <h2>Summe: (${whole_item_cnt} Artikel)  ${whole_amount} €</h2>
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

function get_img(pim_id, color_id) {
    color_id = parseInt(color_id)
    if (pim_id === 1) {
        if (color_id === Color.Red) {
            return "images/tshirts/redshirt.jpg";
        }
        if (color_id === Color.White) {
            return "images/tshirts/whiteshirt.webp";
        }
        if (color_id === Color.Green) {
            return "images/tshirts/greenshirt.webp";
        }
        if (color_id === Color.Blue) {
            return "images/tshirts/blueshirt.webp";
        }
    }
    if (pim_id === 2) {
        if (color_id === Color.Red) {
            return "images/sweater/redsweater.webp";
        }
        if (color_id === Color.White) {
            return "images/sweater/whitesweater.webp";
        }
        if (color_id === Color.Green) {
            return "images/sweater/greensweater.webp";
        }
        if (color_id === Color.Blue) {
            return "images/sweater/bluesweater.webp";
        }
    }
    if (pim_id === 3) {
        if (color_id === Color.Red) {
            return "images/jacket/redjacket.webp";
        }
        if (color_id === Color.White) {
            return "images/jacket/whitejacket.webp";
        }
        if (color_id === Color.Green) {
            return "images/jacket/greenjacket.jpg";
        }
        if (color_id === Color.Blue) {
            return "images/jacket/bluejacket.jpg";
        }
    }
    if (pim_id === 4) {
        if (color_id === Color.Red) {
            return "images/pullover/redpullover.webp";
        }
        if (color_id === Color.White) {
            return "images/pullover/whitepullover.webp";
        }
        if (color_id === Color.Green) {
            return "images/pullover/greenpullover.webp";
        }
        if (color_id === Color.Blue) {
            return "images/pullover/bluepullover.webp";
        }
    }
    //TODO hier einmal für alle pimid´s und alle color ids copy pasten
}

TotalAmount();


var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
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
