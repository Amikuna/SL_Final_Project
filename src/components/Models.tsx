import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { ManProps, ModProps, ModelProps } from "../Types/Types";

type checkMenu = {
  man: string;
  mans: ManProps[];
  onModChange: (newModel: string) => void;
  onManTypeChange: (newManType: string) => void;
  onManTitleChange: (newManTitle: string) => void;
};
type obj = {
  [key: string]: string[];
};
const Model: React.FC<checkMenu> = ({
  man,
  mans,
  onModChange,
  onManTypeChange,
  onManTitleChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMans, setSelectedMans] = useState<string[]>([]);
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
  const mnNs: string[] = [];

  console.log(mnNs);
  useEffect(() => {
    mans
      .filter((mn) => mns.includes(mn.man_id))
      .forEach((m) => {
        mnNs.push(m.man_name);
      });
    setSelectedMans(mnNs);
  }, [man]);

  const handleItemClick = (itemValue: string) => {
    let ms = selectedMans;
    ms = selectedMans.filter((man) => man !== itemValue);
    if (selectedMans.includes(itemValue)) {
      if (mnNs.includes(itemValue)) {
        console.log(itemValue);
      }

      setSelectedMans(ms);
      let dd = "";
      let title = "";
      let mnid = manNs.filter((ms) => ms.man_name !== itemValue);
      if (mnid.length === 0) {
        setSelectedItems((prev) => [...prev, ...[]]);
        onManTypeChange("");

        // setSelectedMans((prev) => [...prev, ...[]]);
        onManTitleChange("ყველა მოდელი");
      } else {
        mnid.forEach((id, idx) => {
          if (idx !== mnid.length - 1) {
            dd = dd + id.man_id + "-";
            title = title + id.man_name + ",";
          } else {
            dd = dd + id.man_id;
            title = title + id.man_name;
          }
        });
        onManTitleChange(title);
        onManTypeChange(dd);
      }
      console.log(dd);
    } else if (selectedItems.includes(itemValue)) {
      let it = selectedItems;

      it = selectedItems.filter((item) => item !== itemValue);

      setSelectedItems(it);
    } else {
      if (!mnNs.includes(itemValue)) {
        console.log(itemValue);
        setSelectedItems([...selectedItems, itemValue]);
      }
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
            // console.log(index);
            setMods((prev) => [...prev, ...data.data]);
            if (mns[index] !== "undefined" && manNs[index]) {
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
    console.log(selectedMans);
    if (selectedItems.length === 1 && mods[0]) {
      let text = "";
      let id = "";
      text = text + selectedItems[0];
      id =
        id +
        mods.filter((md) => md.model_name == selectedItems[0])[0].man_id +
        "." +
        mods.filter((md) => md.model_name == selectedItems[0])[0].model_id;

      let mdss: obj = mns.reduce((obj, key) => {
        return {
          ...obj,
          [key]: [],
        };
      }, {});

      selectedItems.map((item, index) => {
        if (mns[0] !== "undefined") {
          mns.forEach((mn) =>
            mdss[mn].push(
              mods.filter((ms) => ms.model_name == item)[0].model_id.toString()
            )
          );
        }

        if (index === selectedItems.length - 1) {
          text = item;
        } else {
          text = item + ",";
        }
      });
      setTitle(text);
      setClas("txt char-limit");
    } else if (selectedItems.length > 1) {
      let text = "";
      let id = "";
      let mdss: obj = mns.reduce((obj, key) => {
        return {
          ...obj,
          [key]: [],
        };
      }, {});

      selectedItems.map((item, index) => {
        if (mns[0] !== "undefined" && mods[0]) {
          let m: ModelProps | null = null;
          mns.forEach((mn) => {
            m = mods.filter((ms) => ms.model_name == item)[0];
            if (m && m.man_id.toString() == mn) {
              mdss[mn].push(m.model_id.toString());
            }
          });
        }

        if (index === selectedItems.length - 1) {
          text = text + item;
        } else {
          text = text + item + ",";
        }
      });
      const keys = Object.keys(mdss);

      keys.map((key, idx) => {
        if (mdss[key].length === 0) {
          id = id + key + "-";
        } else {
          id = id + key + ".";
        }

        mdss[key].map((md, index) => {
          if (index === mdss[key].length - 1 && idx === keys.length - 1) {
            id = id + md;
          } else if (index === mdss[key].length - 1) {
            id = id + md + "-";
          } else {
            id = id + md + ".";
          }
        });
      });

      console.log("mdss", mdss);

      setClas("txt char-limit");
      setTitle(text);
      onModChange(id);
    } else {
      setTitle("ყველა მოდელი");
      setClas("txt");
    }
  }, [selectedItems, selectedMans]);
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
                  checked={
                    selectedMans.includes(man) || selectedItems.includes(man)
                  }
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