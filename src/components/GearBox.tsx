import React from "react";
import Speed from "../assets/speed.svg";

type EngineProps = {
  Run: number;
};

const PriceWithCommas: React.FC<EngineProps> = ({ Run }) => {
  const formatVolume = (volume: number): string => {
    return (volume / 1000).toFixed(1).toString();
  };
  const formatRun = (FuelId: number): string => {
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
      <img className="falg" src={Speed} />
      <div className="run" style={{ marginLeft: "7%" }}>
        {Run}
      </div>
      <div className="run" style={{ marginLeft: "5%" }}>
        კმ
      </div>
    </div>
  );
};

export default PriceWithCommas;
