import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Get all cart items from redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal for single item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace("$", ""));
    return (price * item.quantity).toFixed(2);
  };

  // Calculate grand total for all items
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Handle + button
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // Handle - button
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name)); // Remove if quantity reaches 0
    }
  };

  // Handle remove button
  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckoutShopping = () => {
    alert("Checkout functionality will be added later!");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {/* If cart empty */}
      {cartItems.length === 0 ? (
        <div>
          <h2>Your cart is empty 😢</h2>
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* Cart item cards */}
          {cartItems.map((item, index) => (
            <div className="cart-card" key={index}>
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: {item.cost}</p>

                <div className="cart-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <p className="subtotal">
                  Subtotal: ${calculateTotalCost(item)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.name)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL SECTION */}
          <h2 className="total-amount">
            Total Amount: ${calculateTotalAmount()}
          </h2>

          {/* Continue + Checkout Buttons */}
          <div className="cart-buttons">
            <button className="continue-btn" onClick={onContinueShopping}>
              Continue Shopping
            </button>

            <button className="checkout-btn" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
