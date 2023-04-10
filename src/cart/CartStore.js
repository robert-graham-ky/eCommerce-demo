import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  subtotal: 0,
  length: 0,
};

export function increaseQuantity(itemId) {
  return { type: "INCREASE_QUANTITY", payload: itemId };
}

export function decreaseQuantity(itemId) {
  return { type: "DECREASE_QUANTITY", payload: itemId };
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // Add the item to the cart items array and update the subtotal and length
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity
        };
        const updatedSubtotal = state.subtotal + (newItem.price * newItem.quantity);
        const updatedLength = state.length + newItem.quantity;
        return { ...state, items: updatedItems, subtotal: updatedSubtotal, length: updatedLength };
      } else {
        const updatedItems = [...state.items, newItem];
        const updatedSubtotal = state.subtotal + (newItem.price * newItem.quantity);
        const updatedLength = state.length + newItem.quantity;
        return { ...state, items: updatedItems, subtotal: updatedSubtotal, length: updatedLength };
      }

    case "REMOVE_ITEM":
      const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.id === itemIdToRemove
      );
      const filteredItems = state.items.filter(
        (item) => item.id !== itemIdToRemove
      );
      const updatedSubtotal =
        state.subtotal - itemToRemove.price * itemToRemove.quantity;
      const updatedLength = state.length - itemToRemove.quantity;
      return {
        ...state,
        items: filteredItems,
        subtotal: updatedSubtotal,
        length: updatedLength,
      };

    case "DECREASE_QUANTITY":
      const itemIdToDecrease = action.payload;
      const itemToDecrease = state.items.find(
        (item) => item.id === itemIdToDecrease
      );
      const decreasedItems = state.items.map((item) => {
        if (item.id === itemIdToDecrease && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      const decreasedSubtotal = state.subtotal - itemToDecrease.price;
      const decreasedLength = state.length - 1;
      return {
        ...state,
        items: decreasedItems,
        subtotal: decreasedSubtotal,
        length: decreasedLength,
      };

    case "INCREASE_QUANTITY":
      const itemIdToIncrease = action.payload;
      const itemToIncrease = state.items.find(
        (item) => item.id === itemIdToIncrease
      );
      const increasedItems = state.items.map((item) => {
        if (item.id === itemIdToIncrease) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      const increasedSubtotal = state.subtotal + itemToIncrease.price;
      const increasedLength = state.length + 1;
      return {
        ...state,
        items: increasedItems,
        subtotal: increasedSubtotal,
        length: increasedLength,
      };

    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
