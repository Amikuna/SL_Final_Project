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
import car from "./assets/car.png";
import spec from "./assets/spec.png";
import moto from "./assets/moto.png";
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
  const [manType, setManType] = useState<number | string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [width, setWidth] = useState<number>();
  const [width2, setWidth2] = useState<number>();
  const [catType, setCatType] = useState<number | string>("");
  const [priceFrom, setPriceFrom] = useState<number | string>("");
  const [priceTo, setPriceTo] = useState<number | string>("");
  const [gel, setGel] = useState<string>(Gel);
  const [usd, setUsd] = useState<string>(UsdB);
  const [curr, setCurr] = useState<number>(3);

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
    if (isPeriod) {
      url =
        url +
        `?ForRent=${bargType}` +
        `&Mans=${manType}` +
        `&Cats=${catType}` +
        `&PriceFrom=${priceFrom}` +
        `&PriceTo=${priceTo}` +
        `&CurrencyID=${curr}` +
        `&Period=${period}h` +
        `&SortOrder=${sort}` +
        `&Page=${page}`;
    } else {
      url =
        url +
        `?ForRent=${bargType}` +
        `&Mans=${manType}` +
        `&Cats=${catType}` +
        `&PriceFrom=${priceFrom}` +
        `&PriceTo=${priceTo}` +
        `&CurrencyID=${curr}` +
        `&SortOrder=${sort}` +
        `&Page=${page}`;
    }

    console.log(url);
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

        el.innerHTML = "ბოლო 1 საათი";
      }
    }
    if (period === 3) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = "ბოლო 3 საათი";
      }
    }
    if (period === 6) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = "ბოლო 6 საათი";
      }
    }
    if (period === 12) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = "ბოლო 12 საათი";
      }
    }
    if (period === 24) {
      let el = document.getElementById("selectDropdown-1");

      if (el) {
        console.log(el.innerHTML);
        console.log(period);

        el.innerHTML = "ბოლო 24 საათი";
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
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=1h";
      } else {
        url = url + "&Period=1h";
      }

      // setS_url((prev) => url);
      setPeriod(1);
      setIsPeriod(true);
      setPage(1);
    }
  };
  const period3H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 3 საათი";
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=3h";
      } else {
        url = url + "&Period=3h";
      }
      // setS_url((prev) => url);
      setPeriod(3);
      setIsPeriod(true);
      setPage(1);
    }
  };
  const period6H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 6 საათი";
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=6h";
      } else {
        url = url + "&Period=6h";
      }
      // setS_url((prev) => url);
      setPeriod(6);
      setIsPeriod(true);
      setPage(1);
    }
  };
  const period12H = () => {
    let el = document.getElementById("selectDropdown-1");
    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 12 საათი";
      console.log(el.title);
    }
    if (url.length === 34) {
      url = url + "?Period=12h";
    } else {
      url = url + "&Period=12h";
    }
    // setS_url((prev) => url);
    setPeriod(12);
    setIsPeriod(true);
    setPage(1);
  };
  const period24H = () => {
    let el = document.getElementById("selectDropdown-1");

    let url: string = s_url;
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 24 საათი";
      console.log(el.title);
      if (url.length === 34) {
        url = url + "?Period=24h";
      } else {
        url = url + "&Period=24h";
      }
      // setS_url((prev) => url);
      setPeriod(24);
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
    }
  };
  const priceDec = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ფასი კლებადი";
      console.log(el.title);
      setSort(3);
    }
  };
  const priceInc = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ფასი ზრდადი";
      console.log(el.title);
      setSort(4);
    }
  };
  const runDec = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "გარბენი კლებადი";
      console.log(el.title);
      setSort(5);
    }
  };
  const runInc = () => {
    let el = document.getElementById("selectDropdown-2");
    if (el) {
      console.log(el.title);
      el.innerHTML = "გარბენი ზრდადი";
      console.log(el.title);
      setSort(6);
    }
  };
  const buy = (newBargType: number | string) => {
    setBargType(newBargType);
    // let el = document.getElementById("selectDropdown-3");
    // if (el) {
    //   console.log(el.title);
    //   el.innerHTML = "იყიდება";
    //   console.log(el.title);
    //   setMarginS1("66%");
    //   // setBargType(0);
    //   // setSort(6);
    // }
  };
  const rent = () => {
    let el = document.getElementById("selectDropdown-3");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ქირავდება";
      console.log(el.title);
      setMarginS1("58%");
      setBargType(1);

      // setSort(6);
    }
  };
  const submit = () => {
    setSubmited((prev) => prev + 1);

    console.log(priceFrom);
    console.log(priceTo);
  };
  const setMan = (man: string) => {
    // let el = document.getElementById("selectDropdown-4");
    // let el2 = document.getElementsByClassName("br2");
    // if (el) {
    //   el.innerHTML = mans.filter((manf) => manf.man_id == man)[0].man_name;
    //   let arr: string[] = [];
    //   setManType(man);
    //   let width1 = el.clientWidth;
    //   let width2 = el2[0].clientWidth;
    //   setWidth(width1);
    //   setWidth2(width2);
    // }
    console.log(man);
    setManType(man);
  };
  const brgClick = () => {
    let but = document.getElementById("selectDropdown-3");
    console.log(5);
    if (but) {
      console.log(but.innerHTML);
      but.click();
    }
  };
  const handleClick = () => {
    let but = document.getElementById("selectDropdown-4");
    console.log(5);
    if (but) {
      console.log(but.innerHTML);
      but.click();
    }
  };
  const catClick = () => {
    let but = document.getElementById("selectDropdown-5");
    console.log(5);
    if (but) {
      // console.log(but.innerHTML);
      but.click();
    }
  };
  const setCat = (cat: string) => {
    // let el = document.getElementById("selectDropdown-5");
    // console.log(5);
    // if (el) {
    //   el.innerHTML = cat.title;
    //   // console.log(but.innerHTML);
    //   setCatType(cat.category_id);
    // }
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
        <Container>
          <div className="d-flex justify-content-center align-items-center">
            <h1>Loading...</h1>
          </div>
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
        <div className="d-flex">
          <Col className="card" style={{ width: "250px", height: "570px" }}>
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <Row style={{ width: "100%" }}>
                <Col className="d-flex justify-content-center align-items-center cat-col">
                  <img
                    src={car}
                    width="30px"
                    height="14px"
                    style={{ color: "black" }}
                  />
                </Col>
                <Col className="d-flex justify-content-center align-items-center cat-col">
                  <img
                    src={spec}
                    width="22px"
                    height="18px"
                    style={{ color: "black" }}
                  />
                </Col>
                <Col className="d-flex justify-content-center align-items-center cat-col">
                  <img
                    src={moto}
                    width="22px"
                    height="18px"
                    style={{ color: "black" }}
                  />
                </Col>
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
                    <DealType bargType={bargType} onBargTypeChange={buy} />
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
                    <Manufacturer mans={mans} onManTypeChange={setMan} />
                  </div>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <div
                    style={{ width: "48%" }}
                    className="d-flex justify-content-center sel"
                  >
                    <Form.Label>კატეგორია</Form.Label>
                  </div>

                  <div className="d-flex justify-content-center">
                    {/* <Dropdown
                      title="ყველა მწარმოებელი"
                      id="selectDropdown-4-div"
                      role="button"
                      onClick={catClick}
                      className="d-flex checkbox-item align-items-center justify-content-between position-relative br2"
                    >
                      <DropdownButton
                        title="ყველა კატეგორია"
                        id="selectDropdown-5"
                        variant="seondary"
                        className="d-flex align-items-center justify-content-between position-relative br2 br2-button"
                      >
                        {categorys.map((category) => {
                          return (
                            <Dropdown.Item
                              onClick={() => setCat(category)}
                              // key={category.title}
                            >
                              {category.title}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                      <BsChevronDown style={{ marginRight: "3%" }} />
                    </Dropdown> */}
                    <Category cats={categorys} onCatTypeChange={setCat} />
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
                    className="d-flex align-items-center justify-content-center sel"
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
                            id="week"
                            value="week"
                            variant="light"
                            onClick={() => handleToggle(1)}
                            active={curr == 3}
                            className="gel btn-circle rounded-circle d-flex align-items-center justify-content-center"
                            // active
                          >
                            <img src={gel} />
                          </ToggleButton>
                          <ToggleButton
                            id="month"
                            value="month"
                            variant="light"
                            onClick={() => handleToggle(2)}
                            active={curr == 2}
                            className="usd btn-circle rounded-circle d-flex align-items-center justify-content-center"
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
                      onChange={(e) => setPriceTo(e.target.value)}
                    />
                  </div>
                  <br />
                </Col>
              </Row>
            </div>
            <Row className="align-items-center">
              <div className="d-flex justify-content-center align-items-center s-btn">
                <Button
                  type="submit"
                  variant="secondary"
                  className="search"
                  onClick={submit}
                >
                  ძებნა
                </Button>
              </div>
            </Row>
          </Col>
          <Col className="products col-9">
            <div className="d-flex align-items-center">
              <Col className="total">
                <h6>{meta?.total} განცხადება</h6>
              </Col>
              <Col className="d-flex justify-content-end filter">
                <DropdownButton
                  id="selectDropdown-1"
                  title="პერიოდი "
                  variant="secondary"
                  className="opt-3"
                >
                  <Dropdown.Item onClick={period1H}>ბოლო 1 საათი</Dropdown.Item>
                  <Dropdown.Item onClick={period3H}>ბოლო 3 საათი</Dropdown.Item>
                  <Dropdown.Item onClick={period6H}>ბოლო 6 საათი</Dropdown.Item>
                  <Dropdown.Item onClick={period12H}>
                    ბოლო 12 საათი
                  </Dropdown.Item>
                  <Dropdown.Item onClick={period24H}>
                    ბოლო 24 საათი
                  </Dropdown.Item>
                </DropdownButton>
                <span style={{ margin: "0 2%" }}></span>
                <DropdownButton
                  id="selectDropdown-2"
                  title="თარიღი კლებადი "
                  variant="secondary"
                  className="opt-3"
                >
                  <Dropdown.Item onClick={dateDec}>
                    თარიღი კლებადი
                  </Dropdown.Item>
                  <Dropdown.Item onClick={dateInc}>თარიღი ზრდადი</Dropdown.Item>
                  <Dropdown.Item onClick={priceDec}>ფასი კლებადი</Dropdown.Item>
                  <Dropdown.Item onClick={priceInc}>ფასი ზრდადი</Dropdown.Item>
                  <Dropdown.Item onClick={runDec}>
                    გარბენი კლებადი
                  </Dropdown.Item>
                  <Dropdown.Item onClick={runInc}>გარბენი ზრდადი</Dropdown.Item>
                </DropdownButton>
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
                    <div className="d-flex">
                      <img className="prod-img" src={img_url} alt="" />
                      <div className="d-flex flex-column w-100">
                        <Row className="row-1">
                          <div className="d-flex justify-content-between">
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
                            <div className="justify-self-end">
                              {prod.customs_passed ? (
                                <div className="custom_passed">
                                  <img className="check" src={Check}></img>{" "}
                                  განბაჟებული
                                </div>
                              ) : (
                                <div className="custom_not">განუბაჟებელი</div>
                              )}
                            </div>
                          </div>
                        </Row>
                        <Row>
                          <div className="d-flex cont align-middle">
                            <PriceWithCommas price={prod} priceId={curr} />
                          </div>
                        </Row>
                      </div>
                    </div>
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
                  // setS_url(prod_url + "?Page=" + page);
                  console.log(s_url);
                }}
                ellipsis={0}
              />
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default App;
