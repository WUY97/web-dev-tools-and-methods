'use strict';
import { getTotalPrice, getCartQuantity, getOneItemPrice } from './helper';

const cats = [
    {
        id: 1,
        name: 'Amy',
        price: 0.99,
        img: 'http://placekitten.com/150/150?image=1',
    },
    {
        id: 2,
        name: 'Lily',
        price: 3.14,
        img: 'http://placekitten.com/150/150?image=2',
    },
    {
        id: 3,
        name: 'Lucy',
        price: 2.73,
        img: 'http://placekitten.com/150/150?image=3',
    },
];

let cartItems = [];
const viewCartBtn = document.querySelector('#view-cart-btn');
const viewCartBtnText = document.querySelector('#view-cart-btn-text');
const cartItemQuantity = document.querySelector('#cart-item-quantity');
const cart = document.querySelector('#cart');
const cartTop = document.querySelector('#cart-top');
const cartBottom = document.querySelector('#cart-bottom');
const clearCartBtn = document.querySelector('#clear-cart-btn');
const emptyCart = document.querySelector('#empty-cart');
const itemsList = document.querySelector('#items-list');

// Define a function to render the items list
function renderItemsList(items) {
    // Clear the current contents of the item list
    itemsList.innerHTML = '';

    // Render a card for each item
    items.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const itemImage = document.createElement('img');
        itemImage.classList.add('card-img');
        itemImage.src = item.img;

        const itemName = document.createElement('h2');
        itemName.classList.add('card-title');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('card-unit-price');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('card-btn');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.setAttribute('data-id', item.id);

        cardBody.appendChild(itemName);
        cardBody.appendChild(itemPrice);
        cardBody.appendChild(addToCartButton);

        card.appendChild(itemImage);
        card.appendChild(cardBody);

        itemsList.appendChild(card);
    });
}

// Define a function to render the cart
// Render cart only happens when user chooses to view cart and cart is not empty.
function renderCartItems(cartItems) {
    cart.style.display = 'block';
    emptyCart.style.display = 'none';
    cartTop.innerHTML = '';
    cartBottom.innerHTML = '';
    cartItems.forEach((item) => {
        // Create a panel for each item in the cart
        const panel = document.createElement('div');
        panel.classList.add('panel');

        const panelBody = document.createElement('div');
        panelBody.classList.add('panel-body');

        const itemImage = document.createElement('img');
        itemImage.classList.add('panel-img');
        itemImage.src = item.img;

        const itemName = document.createElement('h2');
        itemName.classList.add('panel-title');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('panel-unit-price');
        itemPrice.textContent = `Unit price: $${item.price.toFixed(2)}`;

        const itemTotalPrice = document.createElement('p');
        itemTotalPrice.classList.add('one-total-price');
        itemTotalPrice.textContent = `Total price: $${getOneItemPrice(
            item
        ).toFixed(2)}`;

        const itemIncreaseBtn = document.createElement('button');
        itemIncreaseBtn.classList.add('panel-btn');
        itemIncreaseBtn.setAttribute('data-id', item.id);
        itemIncreaseBtn.setAttribute('data-operand', '+');
        itemIncreaseBtn.textContent = '+';

        const itemDecreaseBtn = document.createElement('button');
        itemDecreaseBtn.classList.add('panel-btn');
        itemDecreaseBtn.setAttribute('data-id', item.id);
        itemDecreaseBtn.setAttribute('data-operand', '-');
        itemDecreaseBtn.textContent = '-';

        const itemQuantity = document.createElement('p');
        itemQuantity.classList.add('panel-quantity');
        itemQuantity.textContent = `${item.quantity}`;

        const itemQuantityDiv = document.createElement('div');
        itemQuantityDiv.classList.add('panel-quantity-div');

        const hr = document.createElement('hr');

        itemQuantityDiv.appendChild(itemDecreaseBtn);
        itemQuantityDiv.appendChild(itemQuantity);
        itemQuantityDiv.appendChild(itemIncreaseBtn);

        panelBody.appendChild(itemName);
        panelBody.appendChild(itemPrice);
        panelBody.appendChild(itemTotalPrice);
        panelBody.appendChild(itemQuantityDiv);

        panel.appendChild(itemImage);
        panel.appendChild(panelBody);

        cartTop.appendChild(panel);
        cartTop.appendChild(hr);
    });

    const totalPrice = getTotalPrice(cartItems);
    const totalQuantity = getCartQuantity(cartItems);
    const cartTotalPrice = document.createElement('h3');
    cartTotalPrice.setAttribute('id', 'cart-total-price');
    cartTotalPrice.textContent = `Total: $${totalPrice.toFixed(
        2
    )}, ${totalQuantity} cats`;
    cartBottom.appendChild(cartTotalPrice);

    cartItemQuantity.textContent = `(${getCartQuantity(cartItems)})`;
}

function renderEmptyCart(message) {
    cart.style.display = 'none';
    emptyCart.style.display = 'block';
    emptyCart.innerHTML = '';
    const emptyMessage = document.createElement('h3');
    emptyMessage.classList.add('empty-cart');
    emptyMessage.textContent = message;
    emptyCart.appendChild(emptyMessage);
    cartItemQuantity.textContent = '';
}

function closeCart() {
    cart.style.display = 'none';
    emptyCart.style.display = 'none';
}

// Define a function to handle the click event on the items list
function handleItemsListClick(event) {
    const button = event.target.closest('button');
    // Get the id of the item from the button's data-id attribute
    const itemId = button.getAttribute('data-id');

    // Find the item in the cats array
    const item = cats.find((item) => item.id === parseInt(itemId));

    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    // If the item is already in the cart, increase its quantity
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // If the item is not in the cart, add it with a quantity of 1
        cartItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            img: item.img,
        });
    }

    // Update the cart item quantity
    cartItemQuantity.textContent = `(${getCartQuantity(cartItems)})`;

    // If cart is displayed, update cart items.
    if (
        viewCartBtnText.textContent === 'Hide Cart' &&
        getCartQuantity(cartItems) !== 0
    ) {
        renderCartItems(cartItems);
    }
}

// Default content of button is 'View Cart', so if cart is displayed, change button text to 'Hide Cart'.
// If cart is not displayed, change button text to 'View Cart'.
// If cart is empty, display message 'Cart is empty'.
// If cart is not empty, display cart items and clear button.
function handleViewCartButtonClick() {
    if (viewCartBtnText.textContent === 'View Cart') {
        viewCartBtnText.textContent = 'Hide Cart';
        cart.style.display = 'flex';
        cart.style.flexDirection = 'column';
        cart.style.rowGap = '1rem';
        if (cartItems.length === 0) {
            renderEmptyCart('Nothing in the cart');
        } else {
            renderCartItems(cartItems);
        }
    } else {
        viewCartBtnText.textContent = 'View Cart';
        closeCart();
    }
}

// View cart button text should be 'Hide Cart' and cart must not be empty when clear button exists.
// Default to be hidden. if cart is not empty, display clear button.
// When clicked, clear cart and display message 'Cart is empty', display set to none.
function handleClearCartButtonClick() {
    cartItems = [];
    renderEmptyCart('Checkout Successfully');
}

// Define a function to handle the click event on the cart items list
// If the operand is '+', increase the quantity of the item by 1
// If the operand is '-', decrease the quantity of the item by 1
// If the quantity of the item is 0, remove the item from the cart
// If the cart is empty, display message 'Cart is empty'
// If the cart is not empty, display cart items
function handleChangeCartQuantityClick(event) {
    const button = event.target.closest('button');
    // Get the id of the item from the button's data-id attribute
    const itemId = button.getAttribute('data-id');

    // Check if the item is already in the cart
    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === parseInt(itemId)
    );

    // Get the operand of that button
    const operand = button.getAttribute('data-operand');

    if (operand === '+') {
        existingItem.quantity++;
        // Update the cart item quantity
        renderCartItems(cartItems);
        return;
    } else if (operand === '-') {
        if (existingItem.quantity >= 1) {
            existingItem.quantity--;
        }

        //
        if (existingItem.quantity === 0) {
            cartItems = cartItems.filter((item) => item.id !== existingItem.id);
        }

        // Update the cart item quantity and cart summary
        if (cartItems.length === 0) {
            renderEmptyCart('Nothing in the cart');
        } else {
            renderCartItems(cartItems);
        }
    }
}

// Define a function to initialize the app
function init() {
    renderItemsList(cats);

    // Attach the event listener to the items list
    itemsList.addEventListener('click', handleItemsListClick);

    // Attach the event listener to the "View Cart" button
    viewCartBtn.addEventListener('click', handleViewCartButtonClick);

    // Attach the event listener to the "Clear Cart" button
    clearCartBtn.addEventListener('click', handleClearCartButtonClick);

    // Attach the event listener to the '-' and '+' button in cart items
    cartTop.addEventListener('click', handleChangeCartQuantityClick);
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
