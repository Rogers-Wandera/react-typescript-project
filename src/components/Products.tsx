import React from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

function Products() {
  const { dispatch, stateactions, cart } = useCart();
  const { products } = useProducts();
  let pageContent: React.ReactElement | React.ReactElement[] = (
    <p>Loading....</p>
  );

  if (products?.length > 0) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          stateactions={stateactions}
          inCart={inCart}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;

  return content;
}

export default Products;
