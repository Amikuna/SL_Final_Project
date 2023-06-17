import React from "react";
import GelG from "../assets/gel-gray.svg";
import UsdG from "../assets/usd-gray.svg";
import { ItemProps } from "../Types/Types";

type PriceWithCommasProps = {
  price: ItemProps;
  priceId: number;
};

const PriceWithCommas: React.FC<PriceWithCommasProps> = ({
  price,
  priceId,
}) => {
  const formatPrice = (price: number): string => {
    if (price > 999) {
      let priceStr = Math.round(price).toString().split("");
      for (let i = priceStr.length - 3; i > 0; i -= 3) {
        priceStr.splice(i, 0, ",");
      }
      return priceStr.join("");
    }
    return Math.round(price).toString();
  };
  if (price.price_value === 0) {
    return <h6 className="price-txt">ფასი შეთანხმებით</h6>;
  } else if (priceId == 3) {
    return (
      <div className="d-flex">
        <h5 className="price">{formatPrice(price.price_value)}</h5>
        <img className="price-icon" src={GelG} alt="" />
      </div>
    );
  }
  return (
    <div className="d-flex">
      <h5 className="price">{formatPrice(price.price_usd)}</h5>
      <img className="price-icon" src={UsdG} />
    </div>
  );
};

export default PriceWithCommas;
