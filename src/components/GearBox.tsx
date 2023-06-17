import React from "react";
import Gear from "../assets/avtomatic.svg";

type GearProps = {
  id: number;
};

const GearBox: React.FC<GearProps> = ({ id }) => {
  const formatGear = (id: number): string => {
    if (id === 1) {
      return "მექანიკა";
    } else if (id === 3) {
      return "ტიპტრონიკი";
    } else if (id === 4) {
      return "ვარიატორი";
    }
    return "ავტომატიკა";
  };
  return (
    <div className="d-flex align-items-center">
      <img className="gear" src={Gear} />
      <div className="run" style={{ marginLeft: "7%" }}>
        {formatGear(id)}
      </div>
    </div>
  );
};

export default GearBox;
