let shop = document.getElementById("shop");


// span info array






let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price, coloroptions, imghover, redhover, redid, whiteid, greenid, blueid, sizesid, pimid} = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img id=productimg-id-${pimid} class="productimg" width="220" src=${img} alt="">
      <img class="imghover" width="220" src=${imghover} alt="">
      <div class="details-shop">
        <h3>${name}</h3>
            <p class="color-option">
            <span id=color-id-${redid} onclick="changered(this.id)" class="color-01"></span>
            <span id=color-id-${whiteid} onclick="changewhite(this.id)" class="color-02"></span>
            <span id=color-id-${greenid} onclick="changegreen(this.id)" class="color-03"></span>
            <span id=color-id-${blueid} onclick="changeblue(this.id)"class="color-04"></span>
            </p>
        
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>${price} € </h2>
          <select id="sizes-id-${sizesid}" class="clothsize" name="attribute_pa_size" data-attribute_name="attribute_pa_size">
              <option value="">Größen</option>
              <option value="l">l</option>
              <option value="xl">xl</option>
              <option value="m">m</option>
              <option value="2xl">2xl</option>
              <option value="3xl">3xl</option>
              <option value="4xl">4xl</option>
            </select>
          <div class="buttons">
            <i onclick="decrement(${id})" class="dash-el">-</i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id},${sizesid}, ${pimid})" class="plus-el">+</i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

let coloroption = document.getElementsByClassName("color-option");
let coloroptionarray = Array.from(coloroption);

let coloroptionarray2 = coloroptionarray[0].children;




let increment = (id, csid, pimid) => {
  let selectedItem = id;
  let selectetsize = csid;
  let selectetpimid = pimid;
  let search = basket.find((x) => x.id === selectedItem.id);

  // let size = document.getElementById(`clothsizes-id-${selectedItem.id}`);
  // let sizevalue = size.options[size.selectedIndex].value;
  let size = document.getElementById(`sizes-id-${selectetsize}`);
  let sizevalue = size.options[size.selectedIndex].value;
  console.log(sizevalue);
  

  let color = document.getElementById(`productimg-id-${selectetpimid}`);
  console.log(color.src);





if (search === undefined) {
  basket.push({
    id: selectedItem.id,
    item: 1,
    size: sizevalue,
    color: color.src
  });
} else {
  search.item += 1;
}


console.log(basket);
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
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


zb.substring 



function changered(clicked_id) {

  let color = document.getElementsByClassName("productimg");
  let colorhover = document.getElementsByClassName("imghover");

  
  if (clicked_id === "color-id-1") {
    color[0].src = "images/tshirts/redshirt.jpg";
    colorhover[0].src = "images/tshirts/redshirthover.webp";
  }  else if (clicked_id === "color-id-2") {
    color[1].src = "images/whiteshirt.webp";
    colorhover[1].src = "images/whiteshirthover.webp";
  } else if (clicked_id === "color-id-3") {
    color[2].src = "images/sweater/redsweater.webp";
    colorhover[2].src = "images/sweater/redsweaterhover.webp";
} else if (clicked_id === "color-id-4") {
  color[3].src = "images/jacket/redjacket.webp";
  colorhover[3].src = "images/jacket/redjackethover.webp";

}
}

    

function changewhite(clicked_id) {
  let color = document.getElementsByClassName("productimg");
  let colorhover = document.getElementsByClassName("imghover");

  if (clicked_id === "color-id-1") {
    color[0].src = "images/tshirts/whiteshirt.webp";
    colorhover[0].src = "images/tshirts/whiteshirthover.webp";
  } else if (clicked_id === "color-id-2") {
    color[1].src = "images/whiteshirt.webp";
    colorhover[1].src = "images/whiteshirthover.webp";
  } else if (clicked_id === "color-id-3") {
    color[2].src = "images/sweater/whitesweater.webp";
    colorhover[2].src = "images/sweater/whitesweaterhoverr.webp";
} else if (clicked_id === "color-id-4") {
  color[3].src = "images/jacket/whitejacket.webp";
  colorhover[3].src = "images/jacket/whitejackethover.jpg";

}
}
function changegreen(clicked_id) {
  let color = document.getElementsByClassName("productimg");
  let colorhover = document.getElementsByClassName("imghover");


  if (clicked_id === "color-id-1") {
  
    color[0].src = "images/tshirts/greenshirt.webp";
    colorhover[0].src = "images/tshirts/greenshirthover.jpg";
  } else if (clicked_id === "color-id-2") {
    color[1].src = "images/whiteshirt.webp";
    colorhover[1].src = "images/whiteshirthover.webp";
  } else if (clicked_id === "color-id-3") {
    color[2].src = "images/sweater/greensweater.webp";
    colorhover[2].src = "images/sweater/greensweaterhover.webp";
} else if (clicked_id === "color-id-4") {
  color[3].src = "images/jacket/greenjacket.jpg";
  colorhover[3].src = "images/jacket/greenjackethover.jpg";

}
}

function changeblue(clicked_id) {
  let color = document.getElementsByClassName("productimg");
  let colorhover = document.getElementsByClassName("imghover");


  if (clicked_id === "color-id-1") {
  
    color[0].src = "images/tshirts/blueshirt.webp";
    colorhover[0].src = "images/tshirts/blueshirthover.webp";
  } else if (clicked_id === "color-id-2") {
    color[1].src = "images/whiteshirt.webp";
    colorhover[1].src = "images/whiteshirthover.webp";
  } else if (clicked_id === "color-id-3") {
    color[2].src = "images/sweater/bluesweater.webp";
    colorhover[2].src = "images/sweater/bluesweaterhover.webp";
} else if (clicked_id === "color-id-4") {
  color[3].src = "images/jacket/bluejacket.jpg";
  colorhover[3].src = "images/jacket/bluejackethover.webp";

}
}


