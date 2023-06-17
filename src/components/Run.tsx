import React from "react";
import Speed from "../assets/speed.svg";

type RunProps = {
  Range: number;
};

const Run: React.FC<RunProps> = ({ Range }) => {
  return (
    <div className="d-flex align-items-center">
      <img className="falg" src={Speed} />
      <div className="run" style={{ marginLeft: "7%" }}>
        {Range}
      </div>
      <div className="run" style={{ marginLeft: "5%" }}>
        კმ
      </div>
    </div>
  );
};

export default Run;
