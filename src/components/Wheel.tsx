import React from "react";
import Whl from "../assets/sache.svg";

type WheelProps = {
  id: boolean;
};

const Wheel: React.FC<WheelProps> = ({ id }) => {
  const formatWheel = (id: boolean): string => {
    if (id) {
      return "მარჯვენა";
    }
    return "მარცხენა";
  };
  return (
    <div className="d-flex align-items-center">
      <img className="falg" src={Whl} />
      <div className="run" style={{ marginLeft: "7%" }}>
        {formatWheel(id)}
      </div>
    </div>
  );
};

export default Wheel;
