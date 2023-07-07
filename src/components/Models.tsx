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
  onselModsChange: (newModel: number) => void;
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
  onselModsChange,
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
      .filter((mn) => mns.includes(mn.man_id))
      .forEach((m) => {
        mnNs.push(m.man_name);
      });
    setSelectedMans(mnNs);
  }, [mns]);

  const handleItemClick = (itemValue: string) => {
    let ms = selectedMans;
    ms = selectedMans.filter((man) => man !== itemValue);
    if (selectedMans.includes(itemValue)) {
      setSelectedMans(ms);

      let dd = "";
      let title = "";
      let mnid = manNs.filter((ms) => ms.man_name !== itemValue);
      if (mnid.length === 0) {
        setSelectedItems((prev) => [...prev, ...[]]);
        onselItemsChange([]);
        onManTypeChange("");
        onModChange("");
        onManTitleChange("ყველა მწარმოებელი");
        onselModsChange(Math.random());
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
        onselModsChange(Math.random());
        onManTypeChange(dd);
      }
    } else if (selectedItems.includes(itemValue)) {
      let it = selectedItems;

      it = selectedItems.filter((item) => item !== itemValue);

      setSelectedItems(it);
      onselItemsChange(it);
    } else {
      if (!mnNs.includes(itemValue)) {
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
    let prd: obj = {};
    let ks: string[] = [];
    let md: string[] = [];

    Promise.all(
      mns.map((mn, index) => {
        let mod: string[] = [];

        return fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${mn}`)
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
      })
    )
      .then(() => {
        setProds(prd);
        setPKeys(ks);
        setModNames(md);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch requests
        console.log(error);
      });
  }, [mns]);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setTitle("ყველა მოდელი");
      onTitleChange("ყველა მოდელი");
      setClas("txt");
    } else {
      let text = "";
      let id = "";
      let si = selectedItems;
      let prds = prods;

      Object.keys(prds).map((pk) => {
        id = id + mans.filter((mn) => mn.man_id === pk)[0].man_id;

        prds[pk].map((pr) => {
          si.map((items) => {
            if (pr.includes(items)) {
              if (text === "") {
                text = text + items;
              } else {
                text = text + "," + items;
              }

              id =
                id +
                "." +
                mods.filter((md) => md.model_name == items)[0].model_id;
            }
          });
        });

        id = id + "-";
      });
      if (text === "") {
        setTitle("ყველა მოდელი");
      } else {
        setTitle(text);
      }

      onModChange(id);

      onTitleChange(text);
      setClas("txt char-limit");
    }
  }, [prods, selectedItems]);

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
