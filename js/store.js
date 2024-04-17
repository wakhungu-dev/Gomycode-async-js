document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        const productDiv = document.querySelector(".product-container");
        const cartDiv = document.querySelector(".cart-container");

        // initializing the cart
        let cart = [];

        productDiv.className =
          "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 bg-gray-300 p-4";
        products.forEach((prod) => {
          const newDiv = document.createElement("div");
          newDiv.className =
            "flex flex-col h-[400px] flex-between items-between relative rounded-md bg-white p-5 ";
          newDiv.innerHTML = `
              <div class="flex-1 overflow-hidden flex items-center justify-center">
                <img src="${prod.image}" alt="${prod.description}" class="h-full">
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <h2 class="text-lg md:text-xl font-bold">${prod.title}</h2>
                <h3 class="bg-slate-100/50 rounded">$ ${prod.price}</h3>
                <div class="line-clamp-3">
                  <p class="text-sm md:text-base">${prod.description}</p>
                </div>
                <button class="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded-md" data-id="${prod.id}">Add to Cart</button>
              </div>
            `;
          productDiv.appendChild(newDiv);

          // Add event listener for add to cart button
          const addToCartBtn = newDiv.querySelector(".add-to-cart-btn");
          addToCartBtn.addEventListener("click", () => {
            const productId = parseInt(addToCartBtn.getAttribute("data-id"));
            const productToAdd = products.find(
              (product) => product.id === productId
            );
            if (productToAdd) {
              const existingProduct = cart.find(
                (product) => product.id === productId
              );
              if (existingProduct) {
                existingProduct.quantity++;
              } else {
                productToAdd.quantity = 1;
                cart.push(productToAdd);
              }
              renderCart();
            }
          });
        });

        // Function to render the cart
        function renderCart() {
          cartDiv.innerHTML = "";
          let total = 0;
          cart.forEach((product) => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
              <div class="flex justify-between items-center">
                <p>${product.title}</p>
                <p>$ ${product.price} x ${product.quantity}</p>
                <button class="remove-from-cart-btn bg-red-500 text-white px-2 rounded-md" data-id="${product.id}">Remove</button>
              </div>
            `;
            cartDiv.appendChild(cartItem);
            total += product.price * product.quantity;
          });

          // Render total
          const totalDiv = document.createElement("div");
          totalDiv.innerHTML = `<p class="font-bold">Total: $ ${total.toFixed(
            2
          )}</p>`;
          cartDiv.appendChild(totalDiv);

          // Add event listener for remove from cart button
          const removeFromCartBtns = document.querySelectorAll(
            ".remove-from-cart-btn"
          );
          removeFromCartBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const productId = parseInt(btn.getAttribute("data-id"));
              const index = cart.findIndex(
                (product) => product.id === productId
              );
              if (index !== -1) {
                if (cart[index].quantity > 1) {
                  cart[index].quantity--;
                } else {
                  cart.splice(index, 1);
                }
                renderCart();
              }
            });
          });
        }
      });
  });