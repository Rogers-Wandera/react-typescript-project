import React from "react";
import { cartType, cartitemtype, reduceraction } from "../context/cartContext";

type cartitemprops = {
  item: cartType;
  dispatch: React.Dispatch<reduceraction>;
  //   stateactions: cartitemtype;
};

const CartLinItem = ({ item, dispatch }: cartitemprops) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.quantity * item.price;
  const highestQty: number = 20 > item.quantity ? 20 : item.quantity;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: React.ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`optval-${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "QUANTITY",
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({ type: "REMOVE", payload: { ...item } });
  };

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("en-Us", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.quantity}
        aria-label="Item Quantity Select"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart_item_subtotal" aria-label="Line subtotal">
        {new Intl.NumberFormat("en-Us", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item from cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        X
      </button>
    </li>
  );
  return content;
};

const areItemsEqual = (
  { item: prev }: cartitemprops,
  { item: next }: cartitemprops
) => {
  return Object.keys(prev).every((key) => {
    return prev[key as keyof cartType] === next[key as keyof cartType];
  });
};

const MemoizedCartLineItem = React.memo<typeof CartLinItem>(
  CartLinItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
