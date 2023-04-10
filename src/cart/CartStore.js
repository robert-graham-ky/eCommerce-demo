import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  subtotal: 0,
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
      // Add the item to the cart items array and update the subtotal
      const newItem = action.payload;
      const updatedItems = [...state.items, newItem];
      const updatedSubtotal = state.subtotal + newItem.price;
      return { ...state, items: updatedItems, subtotal: updatedSubtotal };

    case "REMOVE_ITEM":
      // Remove the item from the cart items array and update the subtotal
      const itemIdToRemove = action.payload;
      const filteredItems = state.items.filter(
        (item) => item.id !== itemIdToRemove
      );
      const updatedTotal =
        state.subtotal -
        state.items.find((item) => item.id === itemIdToRemove).price;
      return { ...state, items: filteredItems, subtotal: updatedTotal };

    case "DECREASE_QUANTITY":
      // Decrease the quantity of the item with the corresponding itemId by 1
      const itemIdToDecrease = action.payload;
      const decreasedItems = state.items.map((item) => {
        if (item.id === itemIdToDecrease && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      const decreasedSubtotal =
        state.subtotal -
        state.items.find((item) => item.id === itemIdToDecrease).price;
      return { ...state, items: decreasedItems, subtotal: decreasedSubtotal };

    case "INCREASE_QUANTITY":
      // Increase the quantity of the item with the corresponding itemId by 1
      const itemIdToIncrease = action.payload;
      const increasedItems = state.items.map((item) => {
        if (item.id === itemIdToIncrease) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      const increasedSubtotal =
        state.subtotal +
        state.items.find((item) => item.id === itemIdToIncrease).price;
      return { ...state, items: increasedItems, subtotal: increasedSubtotal };

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