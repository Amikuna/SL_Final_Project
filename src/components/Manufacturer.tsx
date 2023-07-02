import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { ManProps } from "../Types/Types";

type checkMenu = {
  mans: ManProps[];
  Title: string;
  onManTitleChange: (newBargType: string) => void;
  onManTypeChange: (newBargType: string) => void;
};
const Manufacturer: React.FC<checkMenu> = ({
  mans,
  Title,
  onManTitleChange,
  onManTypeChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>(Title);
  const [clas, setClas] = useState<string>("txt");
  let mns = Title.split(",");

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
    console.log("title", title);
    if (Title !== "ყველა მწარმოებელი" && Title.includes(",")) {
      setSelectedItems(Title.split(","));
    } else if (Title !== "ყველა მწარმოებელი" && !Title.includes(",")) {
      setSelectedItems((prev) => [...prev, ...[Title]]);
    }
  }, [mans]);
  useEffect(() => {
    console.log(selectedItems);
    if (selectedItems.length === 1) {
      let text = "";
      let id = "";
      text = text + selectedItems[0];
      id =
        id + mans.filter((man) => man.man_name == selectedItems[0])[0].man_id;
      setTitle(text);
      onManTitleChange(text);
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
      onManTitleChange(text);
      onManTypeChange(id);
    } else {
      if (title === "ყველა მწარმოებელი") {
        setTitle(Title);
        onManTitleChange(Title);
        onManTypeChange("");
        setClas("txt");
      } else {
        setTitle("ყველა მწარმოებელი");
        onManTitleChange(Title);
        onManTypeChange("");
        setClas("txt");
      }
    }
  }, [selectedItems]);
  // useEffect(() => {
  //   setTitle(Title);
  //   mns.map((mn) => {
  //     let it = selectedItems.filter((item) => mn === item);
  //     setSelectedItems(it);
  //   });
  // }, [Title]);
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
        <Dropdown.Menu className="scr">
          <Form>
            <Form.Group>
              {mans.map((man) => (
                <Form.Check
                  type="checkbox"
                  label={man.man_name}
                  checked={selectedItems.includes(man.man_name)}
                  onChange={() => handleItemClick(man.man_name)}
                  className="scr"
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
