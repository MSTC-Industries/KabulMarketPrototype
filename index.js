/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

document.getElementById("toggleCartButton").addEventListener("click", () => {
    const cartMenu = document.getElementById("cartMenu");
    cartMenu.classList.toggle("hidden");
    cartMenu.classList.toggle("visible");
});

let totalAmount = 0; // To keep track of the total price

document.getElementById("apple").addEventListener("click", () => {addToCart("Apple", 1.00)})
document.getElementById("banana").addEventListener("click", () => {addToCart("Banana", 2.00)})
document.getElementById("carrot").addEventListener("click", () => {addToCart("Carrot", 3.00)})
document.getElementById("grapes").addEventListener("click", () => {addToCart("Grapes", 4.00)})

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
            <button class="remove-button">Remove</button>
        `;
        cartItems.appendChild(listItem);
        listItem.addEventListener("click", () => {removeFromCart(item, price)})
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

