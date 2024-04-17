// fetch("https://jsonplaceholder.typicode.com/todos")
fetch("https://fakestoreapi.com/products/category/jewelery");
//   .then((res) => res.json())
then((res) => res.json())
      .then((products) => {
        const productDiv = document.querySelector(".product-container");
        const cartDiv = document.querySelector(".cart-container");

        // Initialize cart
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
            const productToAdd = products.find((product) => product.id === productId);
            if (productToAdd) {
              cart.push(productToAdd);
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
                <p>$ ${product.price}</p>
                <button class="remove-from-cart-btn bg-red-500 text-white px-2 rounded-md" data-id="${product.id}">Remove</button>
              </div>
            `;
            cartDiv.appendChild(cartItem);
            total += product.price;
          });

          // Render total
          const totalDiv = document.createElement("div");
          totalDiv.innerHTML = `<p class="font-bold">Total: $ ${total.toFixed(2)}</p>`;
          cartDiv.appendChild(totalDiv);

          // Add event listener for remove from cart button
          const removeFromCartBtns = document.querySelectorAll(".remove-from-cart-btn");
          removeFromCartBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const productId = parseInt(btn.getAttribute("data-id"));
              cart = cart.filter((product) => product.id !== productId);
              renderCart();
            });
          });
        }
      });




















//   .then((products) => {
//     const productDiv = document.querySelector(".product-container");
//     if (productDiv) {
//     products.forEach((prod) => {
//       const newDiv = document.createElement("div");
//       console.log(prod);
//       newDiv.innerHTML = `
//         <img src='${prod.image}' alt='${prod.description}'>
//         <h2>${prod.title}</h2>
//         <p>${prod.description}</p>
        
//         `;
//       productDiv.appendChild(newDiv);
//     });
//   } 
//   else {
//     console.log('Product container not found.');
//   }
//   });
// .catch((error) => {
//   console.error('Error fetching products:',error);
// });
//   .then((users) => {
//     if(!users)throw Error('No users found')
//     users.forEach(({username,email}) => {
//       const li = document.createElement("li");
//       li.textContent = `${username} - ${email}`;
//     //   li.innerHTML = `
//     //   <h3>${username}</h3>
//     //   <p>${email}</p>
//     //   `
//       userList.appendChild(li);
//     });
//   })
//   .catch(error=>{
//     const userList = document.querySelector(".user-list");
//     const li = document.createElement("li");

// li.textContent = 'An error has occured'
// userList.appendChild(li);

//   })

//   .then((todos) => {
//     if (!todos) throw Error("todos not found");
//     const todosId = document.querySelector(".todos-id");
//     todosId.className = 'grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4'
//     todos.forEach(({ title, completed }) => {
//       const newDiv = document.createElement("div");BB
//       newDiv.className = 'font-sans-serif  p-3  bg-green-200 rounded-xl '
//       newDiv.innerHTML = `
//       <h3 class='font-bold text-2xl p-3 '>Title: ${title}</h3>
//       <p class='p-3 text-xl'> Status: ${completed? 'Complete': 'Incomplete'}</p>
//       `
//     todosId.appendChild(newDiv);
//     });
//   });

// promise

// const cart = ['shoes','trousers','jacket'];
// // OrderId
// const promise = createOrder(cart);
// promise.then(function() {
//     proceedTopayment(orderId);
// });
// // production
// function createOrder(cart) {
//     const pr = new promise(function(resolve,reject){
//         //createOrder
//         // validateCart
//         if(!validateCart(cart)) {
//             const err = new Error('cart is not valid');
//             reject(err);
//         }

//         // logic for createOder
//         const orderId = '12345';
//         if(orderId) {
//             resolve(orderId);
//         }

//     });

//     return pr;
// }

