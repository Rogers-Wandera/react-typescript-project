import React from "react";
import { cartitemtype, reduceraction } from "../context/cartContext";
import { product } from "../context/productsContext";

type productprops = {
  product: product;
  dispatch: React.Dispatch<reduceraction>;
  stateactions: cartitemtype;
  inCart: boolean;
};
const Product = ({
  product,
  dispatch,
  stateactions,
  inCart,
}: productprops): React.ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const addToCart = () =>
    dispatch({ type: "ADD", payload: { ...product, quantity: 1 } });
  const itemInCart = inCart ? "item in cart" : null;
  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-Us", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={addToCart}>Add To Cart</button>
    </article>
  );
  return content;
};

function areProductsEqual(
  { product: prev, inCart: prevIn }: productprops,
  { product: next, inCart: nextIn }: productprops
) {
  return (
    Object.keys(prev).every((key) => {
      return prev[key as keyof product] === next[key as keyof product];
    }) && prevIn === nextIn
  );
}

const memoizedProduct = React.memo<typeof Product>(Product, areProductsEqual);
export default memoizedProduct;
