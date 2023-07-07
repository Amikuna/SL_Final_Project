import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Navbar,
  Container,
  Col,
  Row,
  Form,
  DropdownButton,
  Dropdown,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import logo from "./assets/logo.png";
import car from "./assets/car.svg";
import spec from "./assets/spec.svg";
import moto from "./assets/moto.svg";
import carG from "./assets/car_gray.svg";
import specG from "./assets/spec_gray.svg";
import motoG from "./assets/moto_gray.svg";
import { useState, useEffect } from "react";
import "./fonts/ge/bpg_glaho_sylfaen.ttf";
import { PaginationControl } from "react-bootstrap-pagination-control";
import {
  ManProps,
  ModelProps,
  CategoryProps,
  MetaProp,
  ItemProps,
  CatProps,
  ProdApi,
  ModProps,
} from "./Types/Types";
import Gel from "./assets/gel.png";
import GelB from "./assets/gel_black.png";
import Usd from "./assets/usd.png";
import UsdB from "./assets/usd_black.png";
import Check from "./assets/check.png";
import PriceWithCommas from "./components/PriceWithCommas";
import Manufacturer from "./components/Manufacturer";
import DealType from "./components/DealType";
import Category from "./components/Category";
import Destination from "./components/Destination";
import Engine from "./components/Engine";
import Run from "./components/Run";
import GearBox from "./components/GearBox";
import Wheel from "./components/Wheel";
import Views from "./components/Views";
import Time from "./components/Time";
import Oval from "./assets/Oval.svg";
import Heart from "./assets/heart.svg";
import Vector from "./assets/Vector.svg";
import Shape from "./assets/Shape.svg";
import Models from "./components/Models";

function App() {
  const [mans, setMans] = useState<ManProps[]>([]);
  const [models, setModels] = useState<ModelProps[]>([]);
  const [categorys, setCategorys] = useState<CategoryProps[]>([]);
  const [meta, setMeta] = useState<MetaProp | null>(null);
  const [products, setProducts] = useState<ItemProps[]>([]);
  const [page, setPage] = useState(1);
  const prod_url = "https://api2.myauto.ge/ka/products";
  const [s_url, setS_url] = useState(prod_url);
  const [lastPage, setLastPage] = useState(1);
  const [period, setPeriod] = useState<number>(0);
  const [isPeriod, setIsPeriod] = useState<boolean>(false);
  const [sort, setSort] = useState<number>(1);
  const [marginS1, setMarginS1] = useState("40%");
  const [marginS2, setMarginS2] = useState("5vh");
  const [bargType, setBargType] = useState<number | string>("");
  const [submited, setSubmited] = useState<number>(0);
  const [manType, setManType] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [width, setWidth] = useState<number>();
  const [width2, setWidth2] = useState<number>();
  const [catType, setCatType] = useState<number | string>("");
  const [priceFrom, setPriceFrom] = useState<number | string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [gel, setGel] = useState<string>(Gel);
  const [usd, setUsd] = useState<string>(UsdB);
  const [curr, setCurr] = useState<number>(3);
  const [type, setType] = useState<number>(0);
  const [Car, setCar] = useState<string>(car);
  const [Spec, setSpec] = useState<string>(specG);
  const [Moto, setMoto] = useState<string>(motoG);
  const [ModelId, setModelId] = useState<string>("");
  const [perUrl, setPerUrl] = useState<string>("");
  const [perTitle, setPerTitle] = useState<string>("პერიოდი");
  const [srtTitle, setSrtTitle] = useState<string>("თარიღი კლებადი");
  const [mnTitle, setMnTitle] = useState<string>("ყველა მწარმოებელი");
  const [BargTitle, setBargTitle] = useState<string>("გარიგების ტიპი");
  const [categTitle, setCategTitle] = useState<string>("ყველა კატეგორია");
  const [modTitle, setModTitle] = useState<string>("ყველა მოდელი");
  const [ch, setCh] = useState<string>("");
  const [selItems, setSelItems] = useState<string[]>([]);
  const [MnN, setMnN] = useState<number>(0);
  const plc: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((response) => response.json())
      .then((data: ManProps[]) => setMans(data));
  }, []);
  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((response) => response.json())
      .then((data: CatProps) => {
        if (data) {
          setCategorys(data.data);
        }
      });
  }, []);
  useEffect(() => {
    console.log(s_url);
    let url = s_url; //+ `?page=${page}`;
    console.log("asd", ModelId);
    if (isPeriod) {
      if (ModelId != "") {
        // let ids = [];
        // let mnId: string[] = [];
        // if (ModelId.includes(",")) {
        //   ids = ModelId.split(",");

        //   ids.map((id) => {
        //     mnId.push(id.split(".")[0]);
        //   });
        // }
        console.log("asd", ModelId);
        url =
          url +
          `?TypeID=${type}` +
          `&ForRent=${bargType}` +
          `&Mans=${ModelId}` +
          `&Cats=${catType}` +
          `&PriceFrom=${priceFrom}` +
          `&PriceTo=${priceTo}` +
          `&CurrencyID=${curr}` +
          perUrl +
          `&SortOrder=${sort}` +
          `&Page=${page}`;
      } else {
        url =
          url +
          `?TypeID=${type}` +
          `&ForRent=${bargType}` +
          `&Mans=${manType}` +
          `&Cats=${catType}` +
          `&PriceFrom=${priceFrom}` +
          `&PriceTo=${priceTo}` +
          `&CurrencyID=${curr}` +
          perUrl +
          `&SortOrder=${sort}` +
          `&Page=${page}`;
      }
    } else {
      if (ModelId != "") {
        url =
          url +
          `?TypeID=${type}` +
          `&ForRent=${bargType}` +
          `&Mans=${ModelId}` +
          `&Cats=${catType}` +
          `&PriceFrom=${priceFrom}` +
          `&PriceTo=${priceTo}` +
          `&CurrencyID=${curr}` +
          `&SortOrder=${sort}` +
          `&Page=${page}`;
      } else {
        url =
          url +
          `?TypeID=${type}` +
          `&ForRent=${bargType}` +
          `&Mans=${manType}` +
          `&Cats=${catType}` +
          `&PriceFrom=${priceFrom}` +
          `&PriceTo=${priceTo}` +
          `&CurrencyID=${curr}` +
          `&SortOrder=${sort}` +
          `&Page=${page}`;
      }
    }

    console.log(url);
    console.log(mnTitle);
    fetch(url)
      .then((response) => response.json())
      .then((data: ProdApi) => {
        if (data) {
          setProducts(data.data.items);
          setMeta(data.data.meta);
          setLastPage(data.data.meta.last_page);
        }

        // console.log(data);
        // console.log(data.data.meta.last_page);
      });
  }, [page, period, isPeriod, sort, submited]);
  useEffect(() => {
    products.map((product) => {
      fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${product.man_id}`)
        .then((response) => response.json())
        .then((data: ModProps) => {
          if (data) {
            let mods: ModelProps[] = [];
            data.data.forEach((dat) => {
              products.forEach((prod) => {
                if (prod.model_id === dat.model_id) {
                  mods.push(dat);
                }
              });
            });

            setModels((prev) => [...prev, ...mods]);
          }
        });
    });
  }, [products]);

  useEffect(() => {
    // console.log(models);
  }, [models]);
  useEffect(() => {
    console.log(period);
    if (period === 1) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 2) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 3) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 11) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 12) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 13) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 21) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 22) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    if (period === 23) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = perTitle;
      }
    }
    let el = document.getElementById("selectDropdown-2");
    if (sort === 1) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "თარიღი კლებადი";
        console.log(el.title);
      }
    } else if (sort === 2) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "თარიღი ზრდადი";
        console.log(el.title);
      }
    } else if (sort === 3) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "ფასი კლებადი";
        console.log(el.title);
      }
    } else if (sort === 4) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "ფასი ზრდადი";
        console.log(el.title);
      }
    } else if (sort === 5) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "გარბენი კლებადი";
        console.log(el.title);
      }
    } else if (sort === 6) {
      if (el) {
        console.log(el.title);
        el.innerHTML = "გარბენი ზრდადი";
        console.log(el.title);
      }
    }
  }, [page, products]);

  const period1H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      console.log(url.length);
      el.innerHTML = "ბოლო 1 საათი";
      setPerTitle("ბოლო 1 საათი");
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=1h";
      } else {
        url = url + "&Period=1h";
      }

      // setS_url((prev) => url);
      setPeriod(1);
      setIsPeriod(true);
      setPerUrl(`&Period=${1}h`);
      setPage(1);
    }
  };
  const period2H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      console.log(url.length);
      el.innerHTML = "ბოლო 2 საათი";
      console.log(el.title);
      setPerTitle("ბოლო 2 საათი");
      if (url.length === 34) {
        url = url + "?Period=2h";
      } else {
        url = url + "&Period=2h";
      }

      // setS_url((prev) => url);
      setPeriod(2);
      setIsPeriod(true);
      setPerUrl(`&Period=${2}h`);
      setPage(1);
    }
  };
  const period3H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 3 საათი";
      setPerTitle("ბოლო 3 საათი");
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=3h";
      } else {
        url = url + "&Period=3h";
      }
      // setS_url((prev) => url);
      setPeriod(3);
      setIsPeriod(true);
      setPerUrl(`&Period=${3}h`);
      setPage(1);
    }
  };
  const period1D = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 1 დღე";
      console.log(el.title);
      setPerTitle("ბოლო 1 დღე");
      if (url.length === 34) {
        url = url + "?Period=1d";
      } else {
        url = url + "&Period=1d";
      }
      // setS_url((prev) => url);
      setPeriod(11);
      setIsPeriod(true);
      setPerUrl(`&Period=${1}d`);
      setPage(1);
    }
  };
  const period2D = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 2 დღე";
      console.log(el.title);
      setPerTitle("ბოლო 2 დღე");
      if (url.length === 34) {
        url = url + "?Period=2d";
      } else {
        url = url + "&Period=2d";
      }
      // setS_url((prev) => url);
      setPeriod(12);
      setIsPeriod(true);
      setPerUrl(`&Period=${2}d`);
      setPage(1);
    }
  };
  const period3D = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 3 დღე";
      setPerTitle("ბოლო 3 დღე");
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=3d";
      } else {
        url = url + "&Period=3d";
      }
      // setS_url((prev) => url);
      setPeriod(13);
      setIsPeriod(true);
      setPerUrl(`&Period=${3}d`);
      setPage(1);
    }
  };
  const period1W = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 1 კვირა";
      console.log(el.title);
      setPerTitle("ბოლო 1 კვირა");
      if (url.length === 34) {
        url = url + "?Period=1w";
      } else {
        url = url + "&Period=1w";
      }
      // setS_url((prev) => url);
      setPeriod(21);
      setIsPeriod(true);
      setPerUrl(`&Period=${1}w`);
      setPage(1);
    }
  };
  const period2W = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 2 კვირა";
      console.log(el.title);
      setPerTitle("ბოლო 2 კვირა");
      if (url.length === 34) {
        url = url + "?Period=2w";
      } else {
        url = url + "&Period=2w";
      }
      // setS_url((prev) => url);
      setPeriod(22);
      setIsPeriod(true);
      setPerUrl(`&Period=${2}w`);
      setPage(1);
    }
  };
  const period3W = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 3 კვირა";
      console.log(el.title);
      setPerTitle("ბოლო 3 კვირა");
      if (url.length === 34) {
        url = url + "?Period=3w";
      } else {
        url = url + "&Period=3w";
      }
      // setS_url((prev) => url);
      setPeriod(23);
      setPerUrl(`&Period=${3}w`);
      setIsPeriod(true);
      setPage(1);
    }
  };
  const dateDec = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "თარიღი კლებადი";
      console.log(el.title);
      setSrtTitle("თარიღი კლებადი");
      setSort(1);
    }
  };
  const dateInc = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "თარიღი ზრდადი";
      console.log(el.title);
      setSort(2);
      setSrtTitle("თარიღი ზრდადი");
    }
  };
  const priceDec = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ფასი კლებადი";
      console.log(el.title);
      setSrtTitle("ფასი კლებადი");
      setSort(3);
    }
  };
  const priceInc = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ფასი ზრდადი";
      console.log(el.title);
      setSrtTitle("ფასი ზრდადი");
      setSort(4);
    }
  };
  const runDec = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "გარბენი კლებადი";
      console.log(el.title);
      setSrtTitle("გარბენი კლებადი");
      setSort(5);
    }
  };
  const runInc = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "გარბენი ზრდადი";
      console.log(el.title);
      setSrtTitle("გარბენი ზრდადი");
      setSort(6);
    }
  };
  const buy = (newBargType: number | string) => {
    setBargType(newBargType);
  };
  const bargTitle = (title: string) => {
    setBargTitle(title);
  };
  const rent = () => {
    let el = document.getElementById("selectDropdown-3");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ქირავდება";
      console.log(el.title);
      setMarginS1("58%");
      setBargType(1);
    }
  };
  const setCatTitle = (title: string) => {
    setCategTitle(title);
  };
  const setManTitle = (title: string) => {
    if (title === "ყველა მწარმოებელი") {
      setModelId("");
    }
    setMnTitle(title);
  };
  const setModT = (title: string) => {
    console.log(title);
    setModTitle(title);
  };
  const submit = () => {
    setSubmited((prev) => prev + 1);

    console.log(priceFrom);
    console.log(priceTo);
  };
  const setMan = (man: string) => {
    setManType(man);
    setCh(man);
  };
  const brgClick = () => {
    let but = document.getElementById("selectDropdown-3");
    console.log(5);
    if (but) {
      console.log(but.innerHTML);
      but.click();
    }
  };
  const SmnN = (items: number) => {
    setMnN(items);
  };

  const setCat = (cat: string) => {
    setCatType(cat);
  };
  const handleToggle = (id: number) => {
    if (id === 1) {
      setGel(Gel);
      setUsd(UsdB);
      setCurr(3);
    } else {
      setGel(GelB);
      setUsd(Usd);
      setCurr(1);
    }
  };
  const handleToggle2 = (id: number) => {
    if (id === 0) {
      setType(0);
      setCar(car);
      setSpec(specG);
      setMoto(motoG);
    } else if (id === 1) {
      setType(1);
      setCar(carG);
      setSpec(spec);
      setMoto(motoG);
    } else if (id === 2) {
      setType(2);
      setCar(carG);
      setSpec(specG);
      setMoto(moto);
    }
  };
  const setMd = (md: string) => {
    console.log(md);
    setModelId(md);
  };
  const setMnT = (title: string) => {
    console.log(title);
    setMnTitle(title);
  };
  const setSItems = (items: string[]) => {
    setSelItems(items);
  };

  if (
    mans.length === 0 ||
    categorys.length === 0 ||
    // products.length === 0 ||
    models.length < 15
  ) {
    return (
      <div className="App">
        <Navbar.Brand href="/">
          <div className="header">
            <Container className="nav">
              <img
                src={logo}
                width="131"
                height="40"
                className="d-inline-block align-top logo"
                alt="React Bootstrap logo"
              />
            </Container>
          </div>
        </Navbar.Brand>
        <Container className="cont">
          {plc.map((plc) => {
            return (
              <div className="d-flex justify-content-center  loading">
                <div className="d-flex prod-car">
                  <div className="skeleton skel-img prod-img"></div>
                  <h4 className="skeleton skel-title title">
                    {"                                          "}
                  </h4>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar.Brand href="/">
        <div className="header">
          <Container className="nav">
            <img
              src={logo}
              width="131"
              height="40"
              className="d-inline-block align-top logo"
              alt="React Bootstrap logo"
            />
          </Container>
        </div>
      </Navbar.Brand>
      <br />
      <br />
      <Container className="main">
        <Row className="">
          <Col
            xs={8}
            md={1}
            className="card"
            style={{ width: "250px", height: "100%" }}
          >
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <Row style={{ width: "100%" }}>
                <div className="d-flex justify-content-between typ">
                  <ToggleButtonGroup type="radio" name="view" className="types">
                    <ToggleButton
                      id="car"
                      value="car"
                      variant="light"
                      onClick={() => handleToggle2(0)}
                      active={type === 0}
                      className="d-flex align-items-center justify-content-center cat-col coll-1"
                      // active
                    >
                      <img width="30px" height="14px" src={Car} />
                    </ToggleButton>
                    <ToggleButton
                      id="spec"
                      value="spec"
                      variant="light"
                      onClick={() => handleToggle2(1)}
                      active={type === 1}
                      className="d-flex align-items-center justify-content-center cat-col"
                    >
                      <img width="22px" height="18px" src={Spec} />
                    </ToggleButton>
                    <ToggleButton
                      id="spec"
                      value="moto"
                      variant="light"
                      onClick={() => handleToggle2(2)}
                      active={type === 2}
                      className="d-flex align-items-center justify-content-center cat-col coll-3"
                    >
                      <img width="22px" height="18px" src={Moto} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Row>
            </div>
            <div className="form-sel" style={{ width: "250px" }}>
              <br></br>
              <Row>
                <Col>
                  <div
                    style={{ width: "60%" }}
                    className="d-flex justify-content-center sel"
                  >
                    <Form.Label>გარიგების ტიპი</Form.Label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <DealType
                      bargType={bargType}
                      onBargTypeChange={buy}
                      onBargTitleChange={bargTitle}
                      currTitle={BargTitle}
                    />
                  </div>

                  <style>
                    {`.br > .dropdown-toggle:after {
          margin-left: ${marginS1};
          
        }`}
                  </style>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <div
                    style={{ width: "55%" }}
                    className="d-flex justify-content-center sel"
                  >
                    <Form.Label>მწარმოებელი</Form.Label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <Manufacturer
                      mans={mans}
                      Title={mnTitle}
                      sMnN={MnN}
                      onManTitleChange={setManTitle}
                      onManTypeChange={setMan}
                    />
                  </div>
                </Col>
              </Row>
              <br></br>
              {manType.length !== 0 ? (
                <div>
                  <Row>
                    <Col>
                      <div
                        style={{ width: "42%" }}
                        className="d-flex justify-content-center sel-md"
                      >
                        <Form.Label>მოდელი</Form.Label>
                      </div>

                      <div className="d-flex justify-content-center">
                        {manType ? (
                          <Models
                            man={manType}
                            mans={mans}
                            Title={modTitle}
                            selItems={selItems}
                            onselModsChange={SmnN}
                            onselItemsChange={setSItems}
                            onTitleChange={setModT}
                            onManTypeChange={setMan}
                            onManTitleChange={setMnT}
                            onModChange={setMd}
                          />
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <br></br>
                </div>
              ) : null}

              <Row>
                <Col>
                  <div
                    style={{ width: "48%" }}
                    className="d-flex justify-content-center sel-ct"
                  >
                    <Form.Label>კატეგორია</Form.Label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <Category
                      cats={categorys}
                      onCatTypeChange={setCat}
                      onCatTitleChange={setCatTitle}
                      catTitle={categTitle}
                    />
                  </div>
                </Col>
              </Row>
              <br></br>
            </div>
            <div className="form-sel" style={{ width: "250px" }}>
              <br />
              <Row>
                <Col>
                  <div
                    style={{ width: "100%" }}
                    className="d-flex align-items-center justify-content-center sel-pr"
                  >
                    <Col className=" pr d-flex align-text-bottom">
                      <Form.Label>ფასი</Form.Label>
                    </Col>
                    <Col className="d-flex justify-content-end sw-col">
                      <fieldset>
                        <ToggleButtonGroup
                          type="radio"
                          name="view"
                          className="swt rounded-pill"
                        >
                          <ToggleButton
                            id="gel"
                            value="gel"
                            variant="light"
                            onClick={() => handleToggle(1)}
                            active={curr == 3}
                            className="gel-2 btn-circle rounded-circle d-flex align-items-center justify-content-center"
                            // active
                          >
                            <img src={gel} />
                          </ToggleButton>

                          <ToggleButton
                            id="usd"
                            value="usd"
                            variant="light"
                            onClick={() => handleToggle(2)}
                            active={curr == 1}
                            className="usd-2 btn-circle rounded-circle d-flex align-items-center justify-content-center"
                          >
                            <img src={usd} />
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </fieldset>
                    </Col>
                  </div>

                  <div
                    style={{ width: "100%" }}
                    className="d-flex justify-content-center"
                  >
                    <Form.Control
                      className="price-sel justify-self-start"
                      type="text"
                      id="price-f"
                      placeholder="დან"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <span style={{ alignSelf: "center", margin: "0 5px" }}>
                      -
                    </span>
                    <Form.Control
                      className="price-sel justify-self-end"
                      type="text"
                      id="price-t"
                      placeholder="მდე"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                    />
                  </div>
                  <br />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-center align-items-center s-btn">
              <Row className="align-items-center">
                <Col>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="search"
                    onClick={submit}
                  >
                    ძებნა
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={11} className="products">
            <div className="d-flex align-items-center">
              <Col className="total">
                <h6>{meta?.total} განცხადება</h6>
              </Col>
              <Col className="d-flex justify-content-end filter">
                <div className="d-flex justify-content-center">
                  <Dropdown
                    title="გარიგების ტიპი"
                    id="selectDropdown-4-div"
                    role="button"
                    className="d-flex align-items-center justify-content-between position-relative opt-3"
                  >
                    <DropdownButton
                      title={perTitle}
                      id="selectDropdown-1"
                      variant="seondary"
                      className="d-flex align-items-center justify-content-between position-relative br opt-3"
                    >
                      <Dropdown.Item onClick={period1H}>
                        ბოლო 1 საათი
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period2H}>
                        ბოლო 2 საათი
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period3H}>
                        ბოლო 3 საათი
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period1D}>
                        ბოლო 1 დღე
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period2D}>
                        ბოლო 2 დღე
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period3D}>
                        ბოლო 3 დღე
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period1W}>
                        ბოლო 1 კვირა
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period2W}>
                        ბოლო 2 კვირა
                      </Dropdown.Item>
                      <Dropdown.Item onClick={period3W}>
                        ბოლო 3 კვირა
                      </Dropdown.Item>
                    </DropdownButton>
                    <BsChevronDown style={{ marginRight: "3%" }} />
                  </Dropdown>
                </div>
                <span style={{ margin: "0 2%" }}></span>

                <Dropdown
                  title="გარიგების ტიპი"
                  id="selectDropdown-4-div"
                  role="button"
                  className="d-flex align-items-center justify-content-between position-relative opt-3"
                >
                  <DropdownButton
                    title={srtTitle}
                    id="selectDropdown-2"
                    variant="seondary"
                    className="d-flex align-items-center justify-content-between position-relative br2 opt-3"
                  >
                    <Dropdown.Item onClick={dateDec}>
                      თარიღი კლებადი
                    </Dropdown.Item>
                    <Dropdown.Item onClick={dateInc}>
                      თარიღი ზრდადი
                    </Dropdown.Item>
                    <Dropdown.Item onClick={priceDec}>
                      ფასი კლებადი
                    </Dropdown.Item>
                    <Dropdown.Item onClick={priceInc}>
                      ფასი ზრდადი
                    </Dropdown.Item>
                    <Dropdown.Item onClick={runDec}>
                      გარბენი კლებადი
                    </Dropdown.Item>
                    <Dropdown.Item onClick={runInc}>
                      გარბენი ზრდადი
                    </Dropdown.Item>
                  </DropdownButton>
                  <BsChevronDown style={{ marginRight: "3%" }} />
                </Dropdown>
              </Col>
            </div>

            {products.map((prod) => {
              let img_url =
                "https://static.my.ge/myauto/photos/" +
                prod.photo +
                "/thumbs/" +
                prod.car_id +
                "_1.jpg?v=" +
                prod.photo_ver;

              let title: ManProps[] = mans.filter(
                (man) => man.man_id === prod.man_id.toString()
              );

              let q_model: ModelProps[] = models.filter(
                (model) => model.model_id === prod.model_id
              );

              if (
                // typeof q_model[0] === "undefined" ||
                typeof title[0] === "undefined"
              ) {
                return (
                  <div className="d-flex prod-car">
                    <div className="skeleton skel-img prod-img"></div>
                    <h4 className="skeleton skel-title title"></h4>
                  </div>
                );
              }
              return (
                <div>
                  <div className="prod-car">
                    <Row className="d-flex">
                      <Col md={3} className="img-col">
                        <img className="prod-img" src={img_url} alt="" />
                      </Col>
                      <Col className="d-flex flex-column info">
                        <Row className="row-1 allign-items-center">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex title">
                              <h6 className="name">
                                {q_model[0]
                                  ? title[0].man_name +
                                    " " +
                                    q_model[0].model_name +
                                    " " +
                                    prod.car_model
                                  : title[0].man_name + " " + prod.car_model}
                              </h6>

                              <h6
                                className="year justify-self-start"
                                style={{ width: "20%" }}
                              >
                                {prod.prod_year + " წ"}
                              </h6>
                            </div>
                            <div className="justify-self-end align-items-center">
                              {prod.customs_passed ? (
                                <div className="custom_passed">
                                  <img className="check" src={Check}></img>{" "}
                                  განბაჟებული
                                </div>
                              ) : (
                                <div className="custom_not">განუბაჟებელი</div>
                              )}
                            </div>

                            <Destination Id={prod.location_id} />
                          </div>
                        </Row>
                        <Row className="ft">
                          <Col>
                            <Engine
                              Volume={prod.engine_volume}
                              FuelId={prod.fuel_type_id}
                            />
                            <br></br>
                            <GearBox id={prod.gear_type_id} />
                          </Col>
                          <Col>
                            <Run Range={prod.car_run_km} />
                            <br></br>
                            <Wheel id={prod.rigth_wheel} />
                          </Col>
                          <Col className="d-flex pr justify-content-end">
                            <PriceWithCommas price={prod} priceId={curr} />
                          </Col>
                        </Row>

                        <Row>
                          <div className="d-flex align-items-center">
                            <div className="d-flex cont-3 align-middle">
                              <Views amount={prod.views} />
                              <img className="oval" src={Oval} />
                              <Time date={prod.order_date} />
                            </div>
                            <img className="vector" src={Vector} />
                            <img className="shape" src={Shape} />
                            <img className="heart" src={Heart} />
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              );
            })}
            <div className="pgntion">
              <PaginationControl
                page={page}
                between={4}
                total={lastPage}
                limit={1}
                last={true}
                changePage={(page) => {
                  setPage(page);
                  setProducts((prev) => []);
                  setModels((prev) => []);
                  // setPeriod(period);
                  // setS
                  console.log(s_url);
                }}
                ellipsis={0}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
