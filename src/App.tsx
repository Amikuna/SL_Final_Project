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
} from "react-bootstrap";
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
    fetch(s_url)
      .then((response) => response.json())
      .then((data: ProdApi) => {
        if (data) {
          setProducts(data.data.items);
          setMeta(data.data.meta);
          setLastPage(data.data.meta.last_page);
        }
        console.log(data);
        console.log(data.data.meta.last_page);
      });
  }, [s_url]);
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
    console.log(models);
  }, [models]);

  const period1H = () => {
    let el = document.getElementById("selectDropdown-1");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 1 საათი";
      console.log(el.title);
    }
  };
  const period3H = () => {
    let el = document.getElementById("selectDropdown-1");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 3 საათი";
      console.log(el.title);
    }
  };
  const period6H = () => {
    let el = document.getElementById("selectDropdown-1");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 6 საათი";
      console.log(el.title);
    }
  };
  const period12H = () => {
    let el = document.getElementById("selectDropdown-1");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 12 საათი";
      console.log(el.title);
    }
  };
  const period24H = () => {
    let el = document.getElementById("selectDropdown-1");
    if (el) {
      console.log(el.title);
      el.innerHTML = "ბოლო 24 საათი";
      console.log(el.title);
    }
  };

  if (
    mans.length === 0 ||
    categorys.length === 0 ||
    products.length === 0 ||
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
                    <Form.Select className="opt" style={{ width: "80%" }}>
                      <option className="opt" value="1">
                        იყიდება
                      </option>
                      <option value="2">ქირავდება</option>
                    </Form.Select>
                  </div>
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
                    <Form.Select className="opt-2" style={{ width: "80%" }}>
                      <option>ყველა მწარმოებელი</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
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
                    <Form.Select className="opt" style={{ width: "80%" }}>
                      <option>ყველა კატეგორია</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
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
                    style={{ width: "40%" }}
                    className="d-flex justify-content-center sel"
                  >
                    <Form.Label>ფასი</Form.Label>
                  </div>

                  <div
                    style={{ width: "100%" }}
                    className="d-flex justify-content-center"
                  >
                    <Form.Control
                      className="price-sel justify-self-start"
                      type="text"
                      id="price"
                      placeholder="დან"
                    />
                    <span style={{ alignSelf: "center", margin: "0 5px" }}>
                      -
                    </span>
                    <Form.Control
                      className="price-sel justify-self-end"
                      type="text"
                      id="price"
                      placeholder="მდე"
                    />
                  </div>
                  <br />
                </Col>
              </Row>
            </div>
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
                  <Dropdown.Item eventKey="1" onClick={period1H}>
                    ბოლო 1 საათი
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={period3H}>
                    ბოლო 3 საათი
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={period6H}>
                    ბოლო 6 საათი
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={period12H}>
                    ბოლო 12 საათი
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={period24H}>
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
                  <Dropdown.Item eventKey="1">თარიღი კლებადი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">თარიღი ზრდადი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ფასი კლებადი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ფასი ზრდადი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">გარბენი კლებადი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">გარბენი ზრდადი</Dropdown.Item>
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
                typeof q_model[0] === "undefined" ||
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
                  <div className="d-flex prod-car">
                    <img className="prod-img" src={img_url} alt="" />
                    <div className="d-flex title">
                      <h5 className="name">
                        {title[0].man_name +
                          " " +
                          q_model[0].model_name +
                          " " +
                          prod.car_model}
                      </h5>

                      <h5 className="year">{prod.prod_year + " წ"}</h5>
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
                  setS_url(prod_url + "?Page=" + page);
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
