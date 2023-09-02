import { useContext } from "react";
import { CartContex, UseCartContextType } from "../context/cartContext";

const useCart = (): UseCartContextType => {
  return useContext(CartContex);
};

export default useCart;
