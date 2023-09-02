import React, { createContext, useState } from "react";

export type product = {
  sku: string;
  name: string;
  price: number;
};

const initial_state: product[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
  },
];

export type initStateContextType = {
  products: product[];
};
const initContextState: initStateContextType = { products: [] };

export const PropuctsContext =
  createContext<initStateContextType>(initContextState);
type childrenProps = {
  children?: React.ReactElement | React.ReactElement[];
};
export const ProductsProvider = ({
  children,
}: childrenProps): React.ReactElement => {
  const [products, setProducts] = useState<product[]>(initial_state);

  // React.useEffect(() => {
  //   const fetchData = async (): Promise<product[]> => {
  //     const response = await fetch("http://localhost/3500/products")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error) throw new Error(err.message);
  //       });
  //     return response;
  //   };
  //   fetchData().then((data) => setProducts(data));
  // });
  return (
    <PropuctsContext.Provider value={{ products }}>
      {children}
    </PropuctsContext.Provider>
  );
};
