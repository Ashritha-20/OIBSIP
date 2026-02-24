// ================== LOGIN SYSTEM ==================

function signup() {
    let user = document.getElementById("signupUser").value;
    let pass = document.getElementById("signupPass").value;

    if(user === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Signup Successful!");
    window.location.href = "index.html";
}

function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if(user === storedUser && pass === storedPass) {
        alert("Login Successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid Credentials");
    }
}

// ================== CART SYSTEM ==================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if(item) {
        item.quantity++;
    } else {
        cart.push({name, price, quantity:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
}

function displayCart() {
    let cartDiv = document.getElementById("cartItems");
    let total = 0;
    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartDiv.innerHTML += `
            <div class="cart-item">
                ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
                <button class="removeBtn" onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// ================== PLACE ORDER ==================

function placeOrder() {
    let name = document.getElementById("custName").value;
    let address = document.getElementById("custAddress").value;
    let time = document.getElementById("deliveryTime").value;

    if(name === "" || address === "") {
        alert("Fill customer details");
        return;
    }

    let order = {
        customer: name,
        address: address,
        time: time,
        items: cart,
        total: document.getElementById("total").innerText
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order Placed Successfully! 🍕");
    window.location.href = "home.html";
}

// ================== ADMIN PANEL ==================

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let container = document.getElementById("orders");

    container.innerHTML = "";

    orders.forEach(order => {
        container.innerHTML += `
            <div class="card">
                <h3>${order.customer}</h3>
                <p>${order.address}</p>
                <p>Delivery Time: ${order.time}</p>
                <p>Total: ₹${order.total}</p>
            </div>
        `;
    });
}