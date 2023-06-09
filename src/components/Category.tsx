import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { CategoryProps, ManProps } from "../Types/Types";

type checkMenu = {
  cats: CategoryProps[];
  catTitle: string;
  onCatTypeChange: (newCatType: string) => void;
  onCatTitleChange: (newCatTitle: string) => void;
};
const Category: React.FC<checkMenu> = ({
  cats,
  catTitle,
  onCatTypeChange,
  onCatTitleChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>(catTitle);
  const [clas, setClas] = useState<string>("txt");
  const [curTitle, setCurTitle] = useState<string[]>([]);

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
    if (catTitle !== "ყველა კატეგორია" && catTitle.includes(",")) {
      setSelectedItems(catTitle.split(","));
    } else if (catTitle !== "ყველა კატეგორია" && !catTitle.includes(",")) {
      setSelectedItems([catTitle]);
    }
  }, [cats]);
  useEffect(() => {
    console.log(selectedItems);

    if (selectedItems.length === 1) {
      let text = "";
      let id = "";
      text = text + selectedItems[0];
      id =
        id + cats.filter((cat) => cat.title == selectedItems[0])[0].category_id;
      setTitle(text);
      onCatTitleChange(text);
      setClas("txt char-limit");
      onCatTypeChange(id);
    } else if (selectedItems.length > 1) {
      let text = "";
      let id = "";

      selectedItems.map((item, index) => {
        if (index === selectedItems.length - 1) {
          text = text + item;
          id = id + cats.filter((cat) => cat.title == item)[0].category_id;
        } else {
          text = text + item + ",";
          id =
            id + cats.filter((cat) => cat.title == item)[0].category_id + ".";
        }
      });
      setClas("txt char-limit");
      setTitle(text);
      onCatTitleChange(text);
      onCatTypeChange(id);
    } else {
      setTitle("ყველა კატეგორია");
      onCatTypeChange("");
      onCatTitleChange("ყველა კატეგორია");
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
        <Dropdown.Menu className="scr">
          <Form>
            <Form.Group>
              {cats.map((cat) => (
                <Form.Check
                  type="checkbox"
                  label={cat.title}
                  checked={selectedItems.includes(cat.title)}
                  onChange={() => handleItemClick(cat.title)}
                />
              ))}
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Category;
