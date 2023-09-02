import useCart from "../hooks/useCart";
import Nav from "./Nav";

type headerProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ viewCart, setViewCart }: headerProps) {
  const { totalitems, totalprice } = useCart();
  const Content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>RC Co.</h1>
        <div className="header__price_box">
          <p>Total Items: {totalitems}</p>
          <p>Total Price: {totalprice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
  return Content;
}

export default Header;
