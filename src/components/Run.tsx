import React from "react";
import Speed from "../assets/speed.svg";

type EngineProps = {
  Run: number;
};

const PriceWithCommas: React.FC<EngineProps> = ({ Run }) => {
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
