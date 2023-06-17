import React from "react";
import Engine from "../assets/Union.svg";

type EngineProps = {
  Volume: number;
  FuelId: number;
};

const PriceWithCommas: React.FC<EngineProps> = ({ Volume, FuelId }) => {
  const formatVolume = (volume: number): string => {
    return (volume / 1000).toFixed(1).toString();
  };
  const formatFuel = (FuelId: number): string => {
    if (FuelId === 2) {
      return "ბენზინი";
    } else if (FuelId === 3) {
      return "დიზელი";
    } else if (FuelId === 7) {
      return "ელექტრო";
    } else if (FuelId === 6) {
      return "ჰიბრიდი";
    } else if (FuelId === 10) {
      return "დატენვადი ჰიბრიდი";
    } else if (FuelId === 9) {
      return "ბუნებრივი გაზი";
    } else if (FuelId === 8) {
      return "თხევადი გაზი";
    }
    return "წყალბადი";
  };

  return (
    <div className="d-flex align-items-center">
      <img className="falg" src={Engine} />
      <div className="vol" style={{ marginLeft: "7%" }}>
        {formatVolume(Volume)}
      </div>
      <div className="vol" style={{ marginLeft: "5%" }}>
        {formatFuel(FuelId)}
      </div>
    </div>
  );
};

export default PriceWithCommas;
