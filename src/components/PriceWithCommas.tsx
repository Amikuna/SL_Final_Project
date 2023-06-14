import React from "react";

type PriceWithCommasProps = {
  price: number;
};

const PriceWithCommas: React.FC<PriceWithCommasProps> = ({ price }) => {
  const formatPrice = (price: number): string => {
    if (price > 999) {
      let priceStr = price.toString().split("");
      for (let i = priceStr.length - 3; i > 0; i -= 3) {
        priceStr.splice(i, 0, ",");
      }
      return priceStr.join("");
    }
    return price.toString();
  };

  return <h5 className="price">{formatPrice(price)}</h5>;
};

export default PriceWithCommas;
