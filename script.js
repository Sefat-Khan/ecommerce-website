// Script for navigation bar
document.addEventListener('DOMContentLoaded', function() {
const body = document.getElementById('body');
const featured = document.getElementById('featured');
const products = document.getElementById('products');
const newProducts = document.getElementById('new-products');
const blog = document.getElementById('blog');
const about = document.getElementById('about');
const checkOutCart = document.querySelector('.checkOutCart');
const bag = document.querySelector('.bag');
const mobileBag = document.querySelector('.mobileBag');
const after = document.querySelector('.after');
const checkOutItem = document.querySelector('.checkOutItem');
const checkOutDiv = document.querySelector('.checkOutDiv');

let arr = [];

const bagSpan = document.querySelectorAll('.fa-solid fa-bag-shopping');

     bagSpan.innerHTML = `
        <span class="after"></span>
     `;


(async function fetchData() {
  
    const response = await fetch('data.json');
    const data = await response.json();
    
    /* featured section */

      for (let curr of data) {
        if (curr.id <= 6) {
          const feature = document.createElement('div');
          feature.classList.add('featured-image');
          feature.innerHTML = `
            <img src="${curr.feature}" alt="featured-image" />
            <h6>${curr.data}</h6>
          `
      
          if (featured !== null) {

            featured.appendChild(feature);
          }

          /* about section */

          const abouts = document.createElement('div');
          abouts.classList.add('about-image');
          abouts.innerHTML = `
            <img src="${curr.about}" alt="about-image" />
            <div class="about-info">
              <h3>${curr.aboutData}</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam beatae quas harum ipsa quidem repudiandae velit eos a suscipit officiis. Corporis eaque ratione sequi, ullam voluptas ea quis fugiat tempora tenetur cupiditate beatae laudantium ad consequatur voluptatibus libero, esse corrupti et, harum laborum rerum minus in omnis mollitia modi? Nam.
                 
              </p>

              <abbr title="">
                    Create stunning images with as much or as little control as you
                    like thanks to a choice of basic and Creative modes.  
              </abbr>

              <br>

              <marquee loop="-1" scrollamount="5">
              Create stunning images with as much or as little control as you
              like thanks to a choice of basic and Creative modes.
              </marquee>
              
            </div>
            <h1></h1>
          `

          if (about !== null) {

            about.appendChild(abouts);

            console.log(about);
          }
   
       };

    }

    /* product section */

  for (let pre of data) {

    if (!pre || typeof pre !== 'object' || !('product-img' in pre)) {
      console.error('Invalid data formate:', pre);
      continue;
    }

      const product = document.createElement('div');
      product.classList.add('product-image');
      let productId = (product.dataset.id = pre.id);
      product.addEventListener('click', () => {
        showProductDetails(productId);
      })
      product.innerHTML = `
        <img src="${pre['product-img']}" alt="product" />
        <div class="product-info">
          <p>${pre.brand}</p>
          <h5>${pre['product-info']}</h5>
          <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          </div>
          <div class="price-info">
          <span>$${pre.price}</span>
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
          
        </div>
      `

      if (products !== null) {

        products.appendChild(product);
      } 

    };
      

    function showProductDetails(productId) {

      window.location.href = `sproduct.html?id=${productId}`;
    }
      /* new arrival section */

      for (let ari of data) {
    
      const arrivalsProducts = document.createElement('div');
      arrivalsProducts.classList.add('product-image');
      arrivalsProducts.innerHTML = `
        <img src="${ari['New-Arrival-product-img']}" alt="new-arrivals-image" />
        <div class="product-info">
          <p>${ari.brand}</p>
          <h5>${ari['New-Arrival-product-info']}</h5>
          <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          </div>
          <div class="price-info">
          <span>$${ari.price}</span>
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
          
        </div>
      `

      if (newProducts !== null) {

        newProducts.appendChild(arrivalsProducts);
      }
      
    };


    /* add to cart */


  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const addToCart = document.querySelector('.add-to-cart');
  const selectedProduct = data.find(product => product.id === productId);

  if (addToCart != null) {
  let cartId = (addToCart.dataset.id = selectedProduct.id);
  addToCart.innerHTML = `
    <div class="addCart-image">
      <img id="product-image" src="${selectedProduct['product-img']}" alt="" class="cover-img">
      <div class="slide-image">
          <img src="" alt="" class="sm-image" id="sm-image1">
          <img src="" alt="" class="sm-image" id="sm-image2">
          <img src="" alt="" class="sm-image" id="sm-image3">
          <img src="" alt="" class="sm-image" id="sm-image4">
      </div>
      </div>
      <div class="addcart-info">
      <h3>${selectedProduct['product-info']}</h3>
      <span>$${selectedProduct['price']}</span>
      <select>
          <option>sellect size</option>
          <option>xl</option>
          <option>l</option>
          <option>xxl</option>
          <option>sm</option>
          <option>m</option>
      </select>
      <div class="add-item">
          <button class="plus" id="minus"><i class="fa-solid fa-minus"></i></button>
          <span id="numberOfProduct">0</span>
          <button class="plus" id="plus"><i class="fa-solid fa-plus"></i></button>
          <button class="add-cart-btn" id="add-cart-btn">Add to Cart</button>
      </div>
      <h5>Product Details</h5>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptatum at numquam cumque, quam id ad optio reiciendis! Nemo, ipsam!</p>
  `
  
  document.getElementById('product-image').src = selectedProduct['product-img'];
 
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`sm-image${i}`).src = `img/products/f${i}.jpg`;
 }

 const smImg = document.querySelectorAll('.sm-image');
 const productImg = document.getElementById('product-image');

 smImg.forEach(img => {
    img.addEventListener('click', () => {
      productImg.src = img.src;

    });
 });

 const minusButton = document.getElementById('minus');
 const plusButton = document.getElementById('plus');
 const numberOfProduct = document.getElementById('numberOfProduct');
 

 // Check if all elements are found
 if (minusButton && plusButton && numberOfProduct) {
    let amountValue = parseInt(numberOfProduct.innerText); // Get initial value
    // Event listener for minus button
    minusButton.addEventListener('click', () => {
        if (amountValue > 0) {
            amountValue--; // Decrement value
            numberOfProduct.innerText = amountValue;
             // Update display
        }
    });

    // Event listener for plus button
    plusButton.addEventListener('click', () => {
        amountValue++; // Increment value
        numberOfProduct.innerText = amountValue; // Update display
    });


 }  

 cartProduct(cartId,numberOfProduct);

}

/* cart section */



  // Function to add product to the shopping cart
 
function cartProduct (cartId,numberOfProduct) {

  const addToCartBtn = document.getElementById('add-cart-btn');
   addToCartBtn.addEventListener('click', () => {
    const selectedCartProduct = data.find(product => product.id === cartId);

    const quantity = Number(numberOfProduct.innerText);
    

    addToTable(selectedCartProduct, quantity);
   });
}
   // Event listener for "Add to Cart" button
 


   function addToTable(selectedCartProduct, quantity){
    let positionThisProduct = arr.findIndex(value => value.product_Id === selectedCartProduct.id);
    let price = parseInt(selectedCartProduct.price);
    let subTotal = price * quantity;

    if (arr.length <= 0) {
        arr.push({
            product_Id: selectedCartProduct.id,
            name: selectedCartProduct['product-info'],
            quantity: quantity,
            price: price,
            image: selectedCartProduct['product-img'],
            subtotal: subTotal
        });
    }else if (positionThisProduct < 0) {
      arr.push({
          product_Id: selectedCartProduct.id,
          name: selectedCartProduct['product-info'],
          quantity: quantity,
          price: price,
          image: selectedCartProduct['product-img'],
          subtotal: subTotal
      });
  } else {
     arr[positionThisProduct].quantity = quantity;
     arr[positionThisProduct].subtotal += subTotal;
  }
 
      // Update arr with the new cartItem
      cartMemory();
      addCartToHtmlFile();
  
}
const cartMemory = () => {
    localStorage.setItem('cart', JSON.stringify(arr));

    
    console.log(arr);
}


 const addCartToHtmlFile = () => {
  
  if(!checkOutDiv) {
    console.error('cannot find');
  }
     checkOutDiv.innerHTML = "";
    
    let totalQuantity = 0;
     if(arr.length > 0){
      arr.forEach((cart, index) => {
        totalQuantity = totalQuantity + arr[index].quantity;
        let newCart = document.createElement('div');
        newCart.classList.add('checkOutItem');
        newCart.dataset.id = cart.product_Id;
        newCart.innerHTML = `
          <img src="${cart.image}" alt="">
          <h4>${cart.name}</h4>
          <div class="itemCount">
              <button class="CheckPlus minus" id="minus"><i class="fa-solid fa-minus"></i></button>
              <span>${cart.quantity}</span>
              <button class="CheckPlus Plus" id="plus"><i class="fa-solid fa-plus"></i></button>
          </div>
          <span>$${cart.price}</span>
          <span class="total">$${cart.subtotal}</span>

        `;
        checkOutDiv.appendChild(newCart);

        after.innerHTML = totalQuantity;

        // Get the buttons inside the new cart
        const plusButton = newCart.querySelector('.Plus');
        const minusButton = newCart.querySelector('.minus');
        const quantitySpan = newCart.querySelector('.itemCount span');

        // Add event listener for plus button
        plusButton.addEventListener('click', () => {
            arr[index].quantity++; // Update the quantity in the data
            quantitySpan.textContent = arr[index].quantity; // Update the displayed quantity
            totalQuantity++;
            // You may want to call a function to recalculate subtotal and update it accordingly
            after.innerHTML = totalQuantity;
           cartMemory();
        });

        // Add event listener for minus button
        minusButton.addEventListener('click', () => {
            if (arr[index].quantity > 1) {
                arr[index].quantity--; // Update the quantity in the data
                quantitySpan.textContent = arr[index].quantity; // Update the displayed quantity
                totalQuantity--;
                // You may want to call a function to recalculate subtotal and update it accordingly
                after.innerHTML = totalQuantity;
                cartMemory();
            }else{
              newCart.remove();
              arr.splice(index, 1);
              totalQuantity--;
              after.innerHTML = totalQuantity;
              cartMemory();
            }
            
        });
        
      })

     }

  }


  const checkOutBtn = document.querySelector('.CheckOutBtn');
checkOutBtn.addEventListener('click', () => {
    const cartItemsParam = encodeURIComponent(JSON.stringify(arr));
    window.location.href = `cart.html?cartItems=${cartItemsParam}`;
});

      if(localStorage.getItem('cart')){
        arr = JSON.parse(localStorage.getItem('cart'));
          addCartToHtmlFile();
          UpdateTheTable();
      }

      function UpdateTheTable() {
        const urlParams = new URLSearchParams(window.location.search);
        const cartItemsParam = urlParams.get('cartItems');
        const cartItems = JSON.parse(decodeURIComponent(cartItemsParam));
        
        renderCartItems(cartItems);
    }

   // Function to render cart items in cart.html
   function renderCartItems(cartItems) {
    const cartTable = document.getElementById('table').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = "";
    console.log(cartItems);
    if (cartItems.length > 0) {
        cartItems.forEach(cart => {
            let newRow = document.createElement('tr');
            newRow.classList.add('row');
            newRow.innerHTML = `
                <td><button class="removeBtn"><i class="fa-solid fa-trash"></i></button></td>
                <td><img src="${cart.image}" alt=""></td>
                <td>${cart.name}</td>
                <td>$${cart.price}</td>
                <td>${cart.quantity}</td>
                <td>$${cart.subtotal}</td>
            `;

            const removeBtn = newRow.querySelector('.removeBtn');
            removeBtn.addEventListener('click', () => {
                cartTable.removeChild(newRow);
                const indexToRemove = arr.findIndex(item => item.product_Id === cart.product_Id);
                if (indexToRemove !== -1) {
                  arr.splice(indexToRemove, 1);
                  cartMemory();
                  addCartToHtmlFile();
                  renderCartItems(arr);
                  updateTotal();

                }
            });

            cartTable.appendChild(newRow);
        })
    }
    updateTotal();
}

function updateTotal () {
  const totalCount = document.querySelector('.subTotal-count');
  const shippingCount = document.querySelector('.shipping-count');
  const cartItems = document.querySelectorAll('#table tbody .row');

  let totalSubTotal = 0;

  cartItems.forEach(item => {
    const subTotalCell = item.querySelector('td:nth-child(6)');
    const subTotalValue = parseFloat(subTotalCell.textContent.replace('$', ''));
    totalSubTotal += subTotalValue;
  });

  // Add shipping cost 
  const shippingCost = 100;
  const totalAmount = totalSubTotal + shippingCost;

  // Update the total count display 
  const subTotalCount = document.querySelector('.subTotal-count');
  totalCount.textContent = `$${totalSubTotal}`;

  // Update the shipping count 
  shippingCount.textContent = `$${shippingCost}`;

  // Update the total amount display 
  const totalAmountElement = document.querySelector('.total-amount');
  totalAmountElement.textContent = `$${totalAmount}`;

}

   


   // Implement this according to your HTML structure



  /* blog section */ 

  for (let bl of data) {
    if (bl.id <= 7) {
      const blogs = document.createElement('div');
      blogs.classList.add('blog-image');
      blogs.innerHTML = `
        <img src="${bl.blog}" alt="blog-image" />
        <div class="blog-info">
          <h4>${bl.blogData}</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptatum at numquam cumque, quam id ad optio reiciendis! Nemo, ipsam!</p>
          <a>CONTINUE READING</a>
        </div>
        <h1>${bl.blogDate}</h1>
      `
  
      if (blog !== null) {

        blog.appendChild(blogs);
      }
     

   };

}



})();

/* responsive navbar */

const bar = document.getElementById('bar'); 
const nav = document.querySelector('.nav-bar');
const clear = document.getElementById('cross');
const links = document.querySelectorAll('.nav-list a');

if (bar && nav && clear) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });

  clear.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

links.forEach(link => {
  link.addEventListener('click', () => {
    // Remove 'active' class from all links
    links.forEach(item => item.classList.remove('active'));

    // Add 'active' class to the clicked link
    link.classList.add('active');
  });
});

if (bag || mobileBag && checkOutCart) {
  bag.addEventListener('click', () => {
    if (checkOutCart.style.display === 'none') {
      checkOutCart.style.display = 'grid';
    } else {
      checkOutCart.style.display = 'none';
    }
  });
  mobileBag.addEventListener('click', () => {
    if (checkOutCart.style.display === 'none') {
      checkOutCart.style.display = 'grid';
    } else {
      checkOutCart.style.display = 'none';
    }
  });
}



});


 
  // Function to add product to the shopping cart
