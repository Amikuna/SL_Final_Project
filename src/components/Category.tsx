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
  const [ids, setIds] = useState<string>("");

  const handleItemClick = (itemValue: string) => {
    if (selectedItems.includes(itemValue)) {
      // onManTypeChange("");
      let it = selectedItems;
      it = selectedItems.filter((item) => item !== itemValue);
      setSelectedItems(it);
    } else {
      setSelectedItems([...selectedItems, itemValue]);
    }
  };
  useEffect(() => {
    console.log(selectedItems);
    if (selectedItems.length === 1) {
      let text = "";
      let id = "";
      text = text + selectedItems[0];
      id =
        id + mans.filter((man) => man.man_name == selectedItems[0])[0].man_id;
      setTitle(text);
      setClas("txt char-limit");
      onManTypeChange(id);
    } else if (selectedItems.length > 1) {
      let text = "";
      let id = "";

      selectedItems.map((item, index) => {
        if (index === selectedItems.length - 1) {
          text = text + item;
          id = id + mans.filter((man) => man.man_name == item)[0].man_id;
        } else {
          text = text + item + ",";
          id = id + mans.filter((man) => man.man_name == item)[0].man_id + "-";
        }
      });
      setClas("txt char-limit");
      setTitle(text);
      onManTypeChange(id);
    } else {
      setTitle("ყველა მწარმოებელი");
      onManTypeChange("");
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
