import { useState } from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const initialView = viewCart ? <Cart /> : <Products />;
  const Content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {initialView}
      <Footer viewCart={viewCart} />
    </>
  );
  return Content;
}

export default App;
