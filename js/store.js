document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const productDiv = document.querySelector(".product-container");
      const cartDiv = document.querySelector(".cart-container");
      const categoryFilter = document.getElementById("category-filter");

      // Initializing the cart
      let cart = [];

      // Function to render products
      function renderProducts(productsToRender) {
        productDiv.innerHTML = ""; // Clear previous products
        productsToRender.forEach((prod) => {
          const newDiv = document.createElement("div");
          newDiv.className =
            "flex flex-col h-auto sm:h-[350px] md:h-[400px] flex-between items-between relative rounded-md bg-white p-5";

          newDiv.innerHTML = `
              <div class="flex-1 overflow-hidden flex items-center justify-center">
                <img src="${prod.image}" alt="${prod.title}" class="h-[150px] sm:h-[200px] md:h-full object-contain">
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <h2 class="text-sm sm:text-lg md:text-xl font-bold">${prod.title}</h2>
                <h3 class="bg-slate-100/50 rounded">$ ${prod.price}</h3>
                <div class="line-clamp-3">
                  <p class="text-xs sm:text-sm md:text-base">${prod.description}</p>
                </div>
                <button class="add-to-cart-btn bg-blue-500 text-white px-2 sm:px-4 py-2 rounded-md" data-id="${prod.id}">Add to Cart</button>
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
      }

      // Initial render of all products
      renderProducts(products);

      // Event listener for category filter change
      categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === "all") {
          renderProducts(products);
        } else {
          const filteredProducts = products.filter(
            (product) => product.category === selectedCategory
          );
          renderProducts(filteredProducts);
        }
      });

      // Function to render the cart
      function renderCart() {
        cartDiv.innerHTML = "";
        let total = 0;
        cart.forEach((product) => {
          const cartItem = document.createElement("div");
          cartItem.className =
            "flex flex-col sm:flex-row justify-between items-center p-2 bg-gray-200 rounded mb-2";
          cartItem.innerHTML = `
            <p class="text-sm sm:text-base">${product.title}</p>
            <p class="text-sm sm:text-base">$ ${product.price} x ${product.quantity}</p>
            <button class="remove-from-cart-btn bg-red-500 text-white px-2 sm:px-4 rounded-md" data-id="${product.id}">Remove</button>
          `;
          cartDiv.appendChild(cartItem);
          total += product.price * product.quantity;
        });

        // Render total
        const totalDiv = document.createElement("div");
        totalDiv.className = "font-bold text-center sm:text-right mt-4";
        totalDiv.innerHTML = `<p>Total: $ ${total.toFixed(2)}</p>`;
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
