document.getElementById("toggleCartButton").addEventListener("click", () => {
    const cartMenu = document.getElementById("cartMenu");
    cartMenu.classList.toggle("hidden");
    cartMenu.classList.toggle("visible");
});

let totalAmount = 0; // To keep track of the total price

function addToCart(item, price) {
    const cartItems = document.getElementById("cartItems");
    const existingItem = Array.from(cartItems.children).find(
        (li) => li.textContent.includes(item)
    );

    if (existingItem) {
        const countSpan = existingItem.querySelector(".count");
        const count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
    } else {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item} - Quantity: <span class="count">1</span>
            <button class="remove-button" onclick="removeFromCart('${item}', ${price})">Remove</button>
        `;
        cartItems.appendChild(listItem);
    }

    totalAmount += price; // Add price to total
    updateTotal(); // Update total display
}

function removeFromCart(item, price) {
    const cartItems = document.getElementById("cartItems");
    const existingItem = Array.from(cartItems.children).find(
        (li) => li.textContent.includes(item)
    );

    if (existingItem) {
        const countSpan = existingItem.querySelector(".count");
        const count = parseInt(countSpan.textContent);

        if (count > 1) {
            countSpan.textContent = count - 1;
        } else {
            cartItems.removeChild(existingItem);
        }

        totalAmount -= price; // Subtract price from total
        updateTotal(); // Update total display
    }
}

function updateTotal() {
    const totalDisplay = document.getElementById("totalAmount");
    if (!totalDisplay) {
        const cartMenu = document.getElementById("cartMenu");
        const totalElement = document.createElement("p");
        totalElement.id = "totalAmount";
        totalElement.innerText = `Total: $${totalAmount.toFixed(2)}`;
        cartMenu.appendChild(totalElement);
    } else {
        totalDisplay.innerText = `Total: $${totalAmount.toFixed(2)}`;
    }
}

