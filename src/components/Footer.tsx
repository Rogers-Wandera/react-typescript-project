import useCart from "../hooks/useCart";

type footerProps = {
  viewCart: boolean;
};

function Footer({ viewCart }: footerProps) {
  const { totalitems, totalprice } = useCart();
  const year = new Date().getFullYear();
  const pageContent = viewCart ? (
    <p>shopping cart &copy; {year}</p>
  ) : (
    <>
      <p>Total Items: {totalitems}</p>
      <p>Total Price: {totalprice}</p>
      <p>Shopping Cart &copy;: {year}</p>
    </>
  );
  const content = <footer className="footer">{pageContent}</footer>;
  return content;
}

export default Footer;
