import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import { useRef } from "react";
import { ManProps, ModProps, ModelProps } from "../Types/Types";

type checkMenu = {
  man: string;
  mans: ManProps[];
  Title: string;
  selItems: string[];
  onselItemsChange: (newModel: string[]) => void;
  onModChange: (newModel: string) => void;
  onManTypeChange: (newManType: string) => void;
  onManTitleChange: (newManTitle: string) => void;
  onTitleChange: (newManTitle: string) => void;
};
type obj = {
  [key: string]: string[];
};
const Model: React.FC<checkMenu> = ({
  man,
  mans,
  Title,
  selItems,
  onselItemsChange,
  onModChange,
  onManTypeChange,
  onTitleChange,
  onManTitleChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selItems);
  const [selectedMans, setSelectedMans] = useState<string[]>([]);
  const dropdown = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>(Title);
  const [clas, setClas] = useState<string>("txt");
  const [prods, setProds] = useState<obj>({});
  const [pKeys, setPKeys] = useState<string[]>([]);
  const [mods, setMods] = useState<ModelProps[]>([]);
  const [modNames, setModNames] = useState<string[]>([]);
  const [sz, setSz] = useState<number[]>([]);
  const [mns, setMns] = useState<string[]>(man.split("-"));
  const manNs: ManProps[] = mans.filter((mn) => mns.includes(mn.man_id));
  const mnNs: string[] = [];

  useEffect(() => {
    setMns(man.split("-"));
  }, [man]);
  useEffect(() => {
    mans
      .filter((mn) => man.split("-").includes(mn.man_id))
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
        // console.log(itemValue);
      }
      setSelectedMans(ms);
      let dd = "";
      let title = "";
      let mnid = manNs.filter((ms) => ms.man_name !== itemValue);
      if (mnid.length === 0) {
        setSelectedItems((prev) => [...prev, ...[]]);
        onselItemsChange([]);
        onManTypeChange("");
        onModChange("");
        // console.log("emptied");

        // setSelectedMans((prev) => [...prev, ...[]]);
        onManTitleChange("ყველა მწარმოებელი");
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
      // console.log(dd);
    } else if (selectedItems.includes(itemValue)) {
      let it = selectedItems;

      it = selectedItems.filter((item) => item !== itemValue);

      setSelectedItems(it);
      onselItemsChange(it);
    } else {
      if (!mnNs.includes(itemValue)) {
        // console.log(itemValue);
        setSelectedItems([...selectedItems, itemValue]);
        onselItemsChange([...selectedItems, itemValue]);
      }
    }
  };

  useEffect(() => {
    let text = "";
    selectedItems.map((item, i) => {
      if (i === selectedItems.length - 1) {
        text = text + item;
      } else {
        text = text + item + ",";
      }
    });
  }, [man, selectedItems, selectedMans, manNs, prods]);
  useEffect(() => {
    // setMods((prev) => []);
    // console.log(man);
    // console.log(mans);
    let ln: ModelProps[] = [];
    let prd: obj = {};
    let ks: string[] = [];
    let md: string[] = [];
    mns.map((mn, index) => {
      let mod: string[] = [];
      fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${mn}`)
        .then((response) => response.json())
        .then((data: ModProps) => {
          if (data) {
            setMods((prev) => [...prev, ...data.data]);
            if (mns[index] !== "undefined" && manNs[index]) {
              md.push(manNs[index].man_name);
              data.data.forEach((dat) => {
                md.push(dat.model_name);
                mod.push(dat.model_name);
              });
              prd[mn] = mod;
              if (!ks.includes(mn)) ks.push(mn);
            }
          }
        });
    });
    setProds(prd);
    setPKeys(ks);
    setModNames(md);
  }, [mns]);
  useEffect(() => {
    if (selectedItems.length === 0) {
      setTitle("ყველა მოდელი");
      onTitleChange("ყველა მოდელი");
      setClas("txt");
    } else {
      let text = "";
      selectedMans.forEach((man, index) => {
        const selectedModels = selectedItems
          .filter((item) => item.startsWith(man))
          .map((item) => item.substring(man.length + 1));

        if (index > 0) {
          text += "-";
        }

        text += man;
        if (selectedModels.length > 0) {
          text += "." + selectedModels.join(",");
        }
      });

      setTitle(text);
      onTitleChange(text);
      setClas("txt-active");
    }
  }, [prods, selectedItems, selectedMans]);
  const click = () => {
    if (dropdown.current) {
      dropdown.current.click();
      // console.log(modNames);
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
              {pKeys.map((prd) =>
                prods[prd].map((p, i) =>
                  i === 0 ? (
                    <div>
                      <Form.Check
                        type="checkbox"
                        label={
                          mans.filter((mn) => mn.man_id.toString() === prd)[0]
                            .man_name
                        }
                        checked={selectedMans.includes(
                          mans.filter((mn) => mn.man_id.toString() === prd)[0]
                            .man_name
                        )}
                        onChange={() =>
                          handleItemClick(
                            mans.filter((mn) => mn.man_id.toString() === prd)[0]
                              .man_name
                          )
                        }
                        className="scr"
                      />
                      <Form.Check
                        type="checkbox"
                        label={p}
                        checked={selectedItems.includes(p)}
                        onChange={() => handleItemClick(p)}
                        className="scr"
                      />
                    </div>
                  ) : (
                    <Form.Check
                      type="checkbox"
                      label={p}
                      checked={selectedItems.includes(p)}
                      onChange={() => handleItemClick(p)}
                      className="scr"
                    />
                  )
                )
              )}
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Model;
