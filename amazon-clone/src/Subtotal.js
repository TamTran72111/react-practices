import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import "./Subtotal.css";

const Subtotal = () => {
  const [{ basket }] = useStateValue();

  const getBasketTotal = () =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  const renderText = (value) => (
    <>
      <p>
        Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
    </>
  );

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={renderText}
        decimalScale={2}
        value={getBasketTotal()}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
