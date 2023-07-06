import React from "react";
import GEO from "../assets/geo.svg";
import USA from "../assets/usa.svg";
import { ItemProps } from "../Types/Types";

type DestinationProps = {
  Id: number;
};

const Destination: React.FC<DestinationProps> = ({ Id }) => {
  const formatId = (id: number): string => {
    if (id === 2) {
      return "თბილისი";
    } else if (id == 3) {
      return "ქუთაისი";
    } else if (id == 4) {
      return "ბათუმი";
    } else if (id == 13) {
      return "გორი";
    } else if (id == 15) {
      return "რუსთავი";
    } else if (id == 36) {
      return "ზესტაფონი";
    } else if (id == 23) {
      return "გზაში";
    } else if (id == 21) {
      return "აშშ";
    } else if (id == 19) {
      return "გერმანია";
    } else if (id == 22) {
      return "იაპონია";
    } else if (id == 33) {
      return "ევროპა";
    }
    return "საქართველო";
  };
  if (formatId(Id) === "აშშ") {
    return (
      <div className="d-flex">
        <img className="falg" src={USA} />
        <div className="dest" style={{ marginLeft: "5%" }}>
          {formatId(Id)}
        </div>
      </div>
    );
  } else if (["გერმანია", "იაპონია", "ევროპა"].includes(formatId(Id))) {
    return <div className="d-flex">{formatId(Id)}</div>;
  }
  return (
    <div className="d-flex align-items-center">
      <img className="falg" src={GEO} style={{ marginTop: "8%" }} />
      <div className="dest" style={{ marginLeft: "5%", marginTop: "8%" }}>
        {formatId(Id)}
      </div>
    </div>
  );
};

export default Destination;
