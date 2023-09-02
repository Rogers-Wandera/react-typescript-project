import { createContext, useMemo, useReducer } from "react";

export type cartType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};
type cartstatetype = { cart: cartType[] };
const cartitems: cartstatetype = { cart: [] };

export const cartitemtypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SUBMIT: "SUBMIT",
  QUANTITY: "QUANTITY",
};

export type cartitemtype = keyof typeof cartitemtypes;

export type reduceraction = {
  type: cartitemtype;
  payload?: cartType;
};

const reducer = (
  state: cartstatetype,
  action: reduceraction
): cartstatetype => {
  switch (action.type) {
    case cartitemtypes.ADD: {
      if (!action.payload) {
        throw new Error("payload is missing");
      }
      const { sku, name, price } = action.payload;
      const filteredItems: cartType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const exists: cartType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const quantity = exists ? exists.quantity + 1 : 1;
      console.log(quantity);
      return {
        ...state,
        cart: [...filteredItems, { sku, name, price, quantity }],
      };
    }
    case cartitemtypes.REMOVE: {
      if (!action.payload) {
        throw new Error("payload is missing");
      }
      const { sku } = action.payload;
      const filteredItems: cartType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredItems] };
    }
    case cartitemtypes.QUANTITY: {
      if (!action.payload) {
        throw new Error("payload is missing");
      }
      const { sku, quantity } = action.payload;
      const exists: cartType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!exists) {
        throw new Error("item doesnot exists");
      }
      const updatedItem: cartType = { ...exists, quantity };
      const filteredItems: cartType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredItems, updatedItem] };
    }
    case cartitemtypes.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Action is undefined");
  }
};

const useCartContext = (initstate: cartstatetype) => {
  const [state, dispatch] = useReducer(reducer, initstate);
  const stateactions = useMemo(() => {
    return cartitemtypes;
  }, []);

  const totalitems = state.cart.reduce((prev, cartitem) => {
    return prev + cartitem.quantity;
  }, 0);

  const totalprice = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prev, cartitem) => {
      return prev + cartitem.quantity * cartitem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });
  return { dispatch, stateactions, totalitems, totalprice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  stateactions: cartitemtypes,
  totalitems: 0,
  totalprice: "",
  cart: [],
};

export const CartContex =
  createContext<UseCartContextType>(initCartContextState);
type childrenProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export const CartProvider = ({
  children,
}: childrenProps): React.ReactElement => {
  return (
    <CartContex.Provider value={useCartContext(cartitems)}>
      {children}
    </CartContex.Provider>
  );
};
