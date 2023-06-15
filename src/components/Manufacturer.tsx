import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { ManProps } from "../Types/Types";

type checkMenu = {
  mans: ManProps[];
  onManTypeChange: (newBargType: string) => void;
};
const Manufacturer: React.FC<checkMenu> = ({ mans, onManTypeChange }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>("ყველა მწარმოებელი");
  const [clas, setClas] = useState<string>("txt");

  const handleItemClick = (itemValue: string) => {
    if (selectedItems.includes(itemValue)) {
      onManTypeChange("");
      let it = selectedItems;
      it = selectedItems.filter((item) => item !== itemValue);
      setSelectedItems(it);
    } else {
      // if (itemValue == "იყიდება") {
      //   onManTypeChange();
      // } else {
      //   onManTypeChange(1);
      // }

      setSelectedItems([...selectedItems, itemValue]);
    }
  };
  useEffect(() => {
    console.log(selectedItems);
    if (selectedItems.length === 1) {
      let text = "";
      text = text + selectedItems[0];
      setTitle(text);
      setClas("txt char-limit");
    } else if (selectedItems.length > 1) {
      let text = "";

      selectedItems.map((item, index) => {
        if (index === selectedItems.length - 1) {
          text = text + item;
        } else text = text + item + ",";
      });
      setClas("txt char-limit");
      setTitle(text);
    } else {
      setTitle("ყველა მწარმოებელი");
      setClas("txt");
    }
  }, [selectedItems]);
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
          <div ref={text} className={clas} style={{ marginLeft: "auto" }}>
            {title}
          </div>
        </Dropdown.Toggle>
        <BsChevronDown className="chevron" onClick={click} />
        <Dropdown.Menu>
          <Form>
            <Form.Group>
              {mans.map((man) => (
                <Form.Check
                  type="checkbox"
                  label={man.man_name}
                  checked={selectedItems.includes(man.man_name)}
                  onChange={() => handleItemClick(man.man_name)}
                />
              ))}
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Manufacturer;
