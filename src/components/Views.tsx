import React from "react";

type ViewsProps = {
  amount: number;
};

const Views: React.FC<ViewsProps> = ({ amount }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="view">{amount}</div>
      <div className="view" style={{ marginLeft: "5%" }}>
        ნახვა
      </div>
    </div>
  );
};

export default Views;
