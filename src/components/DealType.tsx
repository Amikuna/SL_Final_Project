import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";

type checkMenu = {
  bargType: number | string;
  onBargTypeChange: (newBargType: number | string) => void;
};
const DealType: React.FC<checkMenu> = ({ bargType, onBargTypeChange }) => {
  const [selectedItems, setSelectedItems] = useState<string>("");
  const [dealType, setDealType] = useState<string[]>(["იყიდება", "ქირავდება"]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>("გარიგების ტიპი");

  const handleItemClick = (itemValue: string) => {
    if (selectedItems.includes(itemValue)) {
      onBargTypeChange("");
      setSelectedItems("");
      setTitle("გარიგების ტიპი");
    } else {
      if (itemValue == "იყიდება") {
        onBargTypeChange(0);
      } else {
        onBargTypeChange(1);
      }
      setSelectedItems(itemValue);
      setTitle(itemValue);
    }
  };
  const click = () => {
    if (dropdown.current) {
      dropdown.current.click();
    }
  };

  return (
    <div className="dv">
      <Dropdown
        className="dr d-flex align-items-center justify-content-start"
        style={{ width: "90%" }}
      >
        <Dropdown.Toggle
          ref={dropdown}
          variant="secondary"
          id="dropdown-checkbox-toggle"
          className="d-flex align-items-center justify-content-start dr2 chevron-right"
        >
          <div ref={text} className="txt" style={{ marginLeft: "auto" }}>
            {title}
          </div>
        </Dropdown.Toggle>
        <BsChevronDown className="chevron" onClick={click} />
        <Dropdown.Menu>
          <Form>
            <Form.Group>
              {dealType.map((deal) => (
                <Form.Check
                  type="checkbox"
                  label={deal}
                  checked={selectedItems.includes(deal)}
                  onChange={() => handleItemClick(deal)}
                />
              ))}
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DealType;
