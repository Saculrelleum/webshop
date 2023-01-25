let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {
                id,
                name,
                desc,
                img,
                price,
                coloroptions,
                imghover,
                redhover,
                sizesid,
                pimid
            } = x;
            let search = basket.find((y) => y.id === id) || [];
            return `
    <div id=product-id-${id} class="item">
      <img id=productimg-id-${pimid} class="productimg" width="220" src="images/tshirts/redshirt.jpg" alt="">
      <img id=productimg-hover-id-${pimid} class="imghover" width="220" src="images/tshirts/redshirthover.webp" alt="">
      <div class="details-shop">
        <h3>${name}</h3>
            <p class="color-option">

            <span id=color-id-${Color.Red} onclick="change_color(${pimid}, ${Color.Red})" class="color-01"></span>
            <span id=color-id-${Color.White} onclick="change_color(${pimid}, ${Color.White})" class="color-02"></span>
            <span id=color-id-${Color.Green} onclick="change_color(${pimid}, ${Color.Green})" class="color-03"></span>
            <span id=color-id-${Color.Blue} onclick="change_color(${pimid}, ${Color.Blue})"class="color-04"></span>
            <div id=color-${pimid}-selected style="display:none;">${Color.Red}</div>
            </p>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>${price} € </h2>
          <select id="sizes-id-${id}" class="clothsize" name="attribute_pa_size" data-attribute_name="attribute_pa_size">
              <option value=${Sizes.S} selected="selected">S</option>
              <option value=${Sizes.M}>M</option>
              <option value=${Sizes.L}>L</option>
              <option value=${Sizes.XL}>XL</option>
              <option value=${Sizes.XXL}>XXL</option>
            </select>
          <div class="buttons">
            <i onclick="change_amount(${id}, -1)" class="dash-el">-</i>
            <div id=${id} class="quantity">1</div>
            <i onclick="change_amount(${id}, 1)" class="plus-el">+</i>
          </div>
          <div>
            <button class="add-btn" onclick="add_to_basket(${id}, ${pimid})">Add</button>
          </div>
        </div>
      </div>
  </div>
    `;
        })
        .join(""));
};

generateShop();
change_color(1,1);
change_color(2,1);
change_color(3,1);
change_color(4,1);



let coloroption = document.getElementsByClassName("color-option");
let coloroptionarray = Array.from(coloroption);
let coloroptionarray2 = coloroptionarray[0].children;

let change_amount = (elem, val) => {
    let amount = parseInt(elem.innerHTML);
    let new_val = amount + val;
    if (new_val <= 1)
        new_val = 1
    elem.innerHTML = new_val.toString()
};

let add_to_basket = (id, pimid) => {
    const item_id = id.id
    const color = document.getElementById(`color-${pimid}-selected`).innerHTML
    const size = document.getElementById(`sizes-id-${item_id}`).value
    const amount = id.innerHTML

    let search = basket.find((x) => x.id === item_id && x.color === color && x.size === size);
    if (search)
        search.amount += parseInt(amount)
    else
        basket.push(
            {
                id: item_id,
                color: color,
                size: size,
                pimid: pimid,
                amount: parseInt(amount)
            }
        )
    localStorage.setItem("data", JSON.stringify(basket));
    update()
}

let update = () => {
    let whole_amount = 0
    for (let i = 0; i < basket.length; i++) {
        whole_amount += parseInt(basket[i].amount)
    }
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = whole_amount.toString()
};

function change_color(pim_id, color_id) {
    let color = document.getElementById(`productimg-id-${pim_id}`);
    let colorhover = document.getElementById(`productimg-hover-id-${pim_id}`);
    let color_id_selected = document.getElementById(`color-${pim_id}-selected`);
    color_id_selected.innerHTML = color_id;

    if (pim_id === 1) {
        if (color_id === Color.Red) {
            color.src = "images/tshirts/redshirt.jpg";
            colorhover.src = "images/tshirts/redshirthover.webp";
        }
        if (color_id === Color.White) {
            color.src = "images/tshirts/whiteshirt.webp";
            colorhover.src = "images/tshirts/whiteshirthover.webp";
        }
        if (color_id === Color.Green) {
            color.src = "images/tshirts/greenshirt.webp";
            colorhover.src = "images/tshirts/greenshirthover.jpg";
        }
        if (color_id === Color.Blue) {
            color.src = "images/tshirts/blueshirt.webp";
            colorhover.src = "images/tshirts/blueshirthover.webp";
        }
    }
    //

    if (pim_id === 2) {
        if (color_id === Color.Red) {
            color.src = "images/sweater/redsweater.webp";
            colorhover.src = "images/sweater/redsweaterhover.webp";
        }
        if (color_id === Color.White) {
            color.src = "images/sweater/whitesweater.webp";
            colorhover.src = "images/sweater/whitesweaterhoverr.webp";
        }
        if (color_id === Color.Green) {
            color.src = "images/sweater/greensweater.webp";
            colorhover.src = "images/sweater/greensweaterhover.webp";
        }
        if (color_id === Color.Blue) {
            color.src = "images/sweater/bluesweater.webp";
            colorhover.src = "images/sweater/bluesweaterhover.webp";
        }
    }
    if (pim_id === 3) {
        if (color_id === Color.Red) {
            color.src = "images/jacket/redjacket.webp";
            colorhover.src = "images/jacket/redjackethover.webp";
        }
        if (color_id === Color.White) {
            color.src = "images/jacket/whitejacket.webp";
            colorhover.src = "images/jacket/whitejackethover.jpg";
        }
        if (color_id === Color.Green) {
            color.src = "images/jacket/greenjacket.jpg";
            colorhover.src = "images/jacket/greenjackethover.jpg";
        }
        if (color_id === Color.Blue) {
            color.src = "images/jacket/bluejacket.jpg";
            colorhover.src = "images/jacket/bluejackethover.webp";
        }
    }

    //TODO: change path for other colors
    if (pim_id === 4) {
        if (color_id === Color.Red) {
            color.src = "images/pullover/redpullover.webp";
            colorhover.src = "images/pullover/redpulloverhover.webp";
        }
        if (color_id === Color.White) {
            color.src = "images/pullover/whitepullover.webp";
            colorhover.src = "images/pullover/whitepulloverhover.webp";
        }
        if (color_id === Color.Green) {
            color.src = "images/pullover/greenpullover.webp";
            colorhover.src = "images/pullover/greenpulloverhover.webp";
        }
        if (color_id === Color.Blue) {
            color.src = "images/pullover/bluepullover.webp";
            colorhover.src = "images/pullover/bluepulloverhover.webp";
        }
    }

    //
    //TODO hier auch einmal alles copy pasta

}

update()

