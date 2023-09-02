import { useContext } from "react";
import {
  PropuctsContext,
  initStateContextType,
} from "../context/productsContext";

const useProducts = (): initStateContextType => {
  return useContext(PropuctsContext);
};

export default useProducts;
