import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CartLinItem from "./CartLinItem";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { cart, totalitems, totalprice, dispatch, stateactions } = useCart();

  const onSubmit = () => {
    dispatch({ type: "SUBMIT" });
    setConfirm(true);
  };

  let pageContent = confirm ? (
    <h2>Thank you for your order</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLinItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              //   stateactions={stateactions}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalitems}</p>
        <p>Total Price: {totalprice}</p>
        <button
          className="cart__submit"
          disabled={!totalitems}
          onClick={onSubmit}
        >
          Place Order
        </button>
      </div>
    </>
  );
  const content = <main className="main main--cart">{pageContent}</main>;
  return content;
}

export default Cart;
