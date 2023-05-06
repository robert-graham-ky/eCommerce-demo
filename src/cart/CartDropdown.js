import { cartReducer, increaseQuantity, decreaseQuantity } from "./CartStore";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
function CartDropdown() {
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const length = useSelector((state) => state.cart.length);
  const dispatch = useDispatch();

  function handleDecreaseQuantity(itemId) {
    dispatch(decreaseQuantity(itemId));
  }

  function handleIncreaseQuantity(itemId) {
    dispatch(increaseQuantity(itemId));
  }

  function handleCheckout() {
    // Navigate to the checkout page
  }

  return (
    <div className="dropdown" data-bs-auto-close="outside">
      <button
        className="btn btn-outline-dark me-3 d-none d-lg-inline dropdown-toggle"
        type="button"
        id="cartDropdown"
        data-bs-toggle="dropdown"
        data-bs-persistence="true"
        data-bs-auto-end="false"
        
      >
        <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
        <span className="ms-3 badge rounded-pill bg-dark">{length}</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="cartDropdown" data-bs-auto-close="outside" onClick={(event) => event.stopPropagation()}>
        {items.map((item) => (
          <div key={item.id} className="dropdown-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h5>{item.name}</h5>
              <p>${item.price}</p>
              <div className="quantity">
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: item.id })
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>Your cart is empty</p>}
        <div className="subtotal">
          <p>Subtotal: ${subtotal}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartDropdown;
