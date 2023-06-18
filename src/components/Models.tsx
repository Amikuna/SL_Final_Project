import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { ManProps, ModProps, ModelProps } from "../Types/Types";

type checkMenu = {
  man: string;
  mans: ManProps[];
  onManTypeChange: (newModel: string) => void;
};
type obj = {
  [key: string]: string[];
};
const Model: React.FC<checkMenu> = ({ man, mans, onManTypeChange }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>("მოდელი");
  const [clas, setClas] = useState<string>("txt");
  const [ids, setIds] = useState<string>("");
  const [mods, setMods] = useState<ModelProps[]>([]);
  const [modNames, setModNames] = useState<string[]>([]);
  const [sz, setSz] = useState<number[]>([]);
  const mns = man.split("-");
  const manNs: ManProps[] = mans.filter((mn) => mns.includes(mn.man_id));

  const handleItemClick = (itemValue: string) => {
    if (selectedItems.includes(itemValue)) {
      let it = selectedItems;
      it = selectedItems.filter((item) => item !== itemValue);
      setSelectedItems(it);
    } else {
      setSelectedItems([...selectedItems, itemValue]);
    }
  };
  useEffect(() => {
    setMods((prev) => []);
    console.log(man);
    // console.log(mans);
    let ln: ModelProps[] = [];
    let md: string[] = [];
    mns.map((mn, index) => {
      fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${mn}`)
        .then((response) => response.json())
        .then((data: ModProps) => {
          if (data) {
            console.log(index);
            setMods(data.data);
            if (mns[index] !== "undefined") {
              md.push(manNs[index].man_name);
              data.data.forEach((dat) => md.push(dat.model_name));
            }

            // console.log(ln);
          }
        });
    });
    setModNames(md);
  }, [man]);
  useEffect(() => {
    // console.log(selectedItems);
    if (selectedItems.length === 1) {
      let text = "";
      let id = "";
      text = text + selectedItems[0];
      id =
        id +
        mods.filter((md) => md.model_name == selectedItems[0])[0].man_id +
        "." +
        mods.filter((md) => md.model_name == selectedItems[0])[0].model_id;
      setTitle(text);
      setClas("txt char-limit");
      // onManTypeChange();
    } else if (selectedItems.length > 1) {
      let text = "";
      let id = "";
      let mdss = {};

      selectedItems.map((item, index) => {
        if (index === selectedItems.length - 1) {
          text = text + item;
          id = id + mods.filter((ms) => ms.model_name == item)[0].model_id;
        } else {
          text = text + item + ",";
          let id = "";
          let mdss: obj = mns.reduce((obj, key) => {
            return {
              ...obj,
              [key]: [],
            };
          }, {});
          if (mns[0] !== "undefined") {
            mns.forEach(
              (mn) =>
                (mdss[mn] = selectedItems.filter(
                  (item) =>
                    mn ==
                    mods
                      .filter((ms) => ms.model_name == item)[0]
                      .man_id.toString()
                ))
            );
          }

          console.log(mdss);
          // mdss.push(mods.filter((ms)=>ms.model_name==item).forEach((md)=>(
          //   mns.includes(md.man_id.toString())
          // )));
          id =
            id + mods.filter((ms) => ms.model_name == item)[0].model_id + "-";
        }
      });
      setClas("tx char-limit");
      setTitle(text);
    } else {
      setTitle("ყველა მწარმოებელი");
      // onManTypeChange("");
      setClas("txt");
    }
  }, [selectedItems]);
  const click = () => {
    if (dropdown.current) {
      dropdown.current.click();
      console.log(modNames);
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
              {modNames.map((man) => (
                <Form.Check
                  type="checkbox"
                  label={man}
                  checked={selectedItems.includes(man)}
                  onChange={() => handleItemClick(man)}
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

export default Model;
