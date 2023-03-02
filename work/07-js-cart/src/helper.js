'use strict';
export const getTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    return totalPrice;
}

export const getOneItemPrice = (item) => {
    let totalPrice = 0;
    return item.price * item.quantity;
}

export const getCartQuantity = (cartItems) => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
        totalQuantity += item.quantity;
    });

    if (totalQuantity === 0) {
        return '';
    }

    return totalQuantity;
}