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

function App() {
  type manProps = {
    man_id: string;
    man_name: string;
    is_car: string;
    is_spec: string;
    is_moto: string;
  };
  type modProps = {
    data: modelProps[];
    versioning: object;
  };
  type modelProps = {
    model_id: number;
    model_name: string;
    model_group: string;
    sort_order: number;
    cat_man_id: number;
    cat_model_id: number;
    cat_modif_id: number;
    is_car: boolean;
    is_moto: boolean;
    is_spec: boolean;
    show_in_salons: number;
    shown_in_slider: number;
  };
  type catProps = {
    data: categoryProps[];
    mess?: object;
  };
  type categoryProps = {
    category_id: number;
    category_type: number;
    has_icon: number;
    title: string;
    seo_title: string;
    vehicle_types: number[];
  };
  type prodAPI = {
    statusCode: number;
    statusMessage: string;
    data: dataProps;
  };
  type dataProps = {
    items: itemProps[];
    meta: metaProp;
  };
  type metaProp = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  type itemProps = {
    car_id: number;
    status_id: number;
    dealer_user_id: number;
    paid_add: number;
    photo: string;
    pic_number: number;
    prod_year: number;
    prod_month: number;
    man_id: number;
    car_model: string;
    price: number;
    price_usd: number;
    first_deposit: number;
    price_value: number;
    fuel_type_id: number;
    gear_type_id: number;
    drive_type_id: number;
    door_type_id: number;
    color_id: number;
    saloon_color_id: number;
    cylinders: number;
    car_run: number;
    car_run_km: number;
    car_run_dim: number;
    engine_volume: number;
    airbags: number;
    abs: boolean;
    esd: boolean;
    el_windows: boolean;
    conditioner: boolean;
    leather: boolean;
    disks: boolean;
    nav_system: boolean;
    central_lock: boolean;
    hatch: boolean;
    rigth_wheel: boolean;
    alarm: boolean;
    board_comp: boolean;
    hydraulics: boolean;
    chair_warming: boolean;
    climat_control: boolean;
    obstacle_indicator: boolean;
    customs_passed: boolean;
    client_name: string;
    client_phone: number;
    model_id: number;
    location_id: number;
    parent_loc_id: number;
    tech_inspection: boolean;
    checked_for_duplicates: boolean;
    order_number: number;
    stickers: null;
    changable: boolean;
    auction: boolean;
    has_turbo: boolean;
    for_rent: boolean;
    rent_daily: boolean;
    rent_purchase: boolean;
    rent_insured: boolean;
    rent_driver: boolean;
    currency_id: number;
    vehicle_type: number;
    category_id: number;
    vin: number;
    user_type: null;
    prom_color: number;
    special_persons: boolean;
    back_camera: boolean;
    car_desc: string;
    order_date: string;
    video_url: string;
    hp: number;
    hours_used: number;
    photo_ver: number;
    checked: boolean;
    lang_type_id: number;
    el_starter: boolean;
    start_stop: boolean;
    trunk: boolean;
    windshield: boolean;
    inspected_in_greenway: boolean;
    license_number: string;
    words_checked: number;
    is_payd: boolean;
    condition_type_id: number;
    primary_damage_type: number;
    secondary_damage_type: number;
    auction_has_key: number;
    is_auction: number;
    saloon_material_id: number;
    map_lat: number;
    map_long: number;
    zoom: number;
    predicted_price: string;
    hdd: number;
    map_title: string;
    has_catalyst: number;
    tmp: string;
    views: number;
    dealer_id: null;
    has_log: null;
    logo_ver: null;
    active_ads: null;
    dealer_title: null;
    has_predicted_price: boolean;
    pred_first_breakpoint: number;
    pred_second_breakpoint: number;
    pred_min_price: number;
    pred_max_price: number;
    comfort_features: number[];
  };
  const [mans, setMans] = useState<manProps[]>([]);
  const [models, setModels] = useState<modelProps[]>([]);
  const [categorys, setCategorys] = useState<categoryProps[]>([]);
  const [meta, setMeta] = useState<metaProp | null>(null);
  const [products, setProducts] = useState<itemProps[]>([]);
  const [page, setPage] = useState(1);
  const prod_url = "https://api2.myauto.ge/ka/products";
  const [s_url, setS_url] = useState(prod_url);
  const [lastPage, setLastPage] = useState(1);

  // const fetchData = async (id: number) => {
  //   let url: string = "https://api2.myauto.ge/ka/getManModels?man_id=" + id;
  //   try {
  //     const response = await fetch(url);
  //     const jsonData = await response.json();
  //     setModels(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // function GetModels(id: number) {
  //   const url = "https://api2.myauto.ge/ka/getManModels?man_id=" + id;

  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data: modProps[]) => setModels(data));
  //   });
  // }

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((response) => response.json())
      .then((data: manProps[]) => setMans(data));
  }, []);
  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((response) => response.json())
      .then((data: catProps) => {
        if (data) {
          setCategorys(data.data);
        }
      });
  }, []);
  useEffect(() => {
    fetch(s_url)
      .then((response) => response.json())
      .then((data: prodAPI) => {
        if (data) {
          setProducts(data.data.items);
          setMeta(data.data.meta);
          setLastPage(data.data.meta.last_page);
        }
        console.log(data);
      });
  }, [s_url]);
  // const getModels = (id: number) => {
  //   fetchData(id);
  // };
  useEffect(() => {
    products.map((product) => {
      fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${product.man_id}`)
        .then((response) => response.json())
        .then((data: modProps) => {
          if (data) {
            let mods: modelProps[] = [];
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

  if (
    mans.length === 0 &&
    categorys.length === 0 &&
    products.length === 0 &&
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
                  id="selectDropdown"
                  title="პერიოდი "
                  variant="secondary"
                  className="opt-3"
                >
                  <Dropdown.Item eventKey="1">ბოლო 1 საათი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ბოლო 3 საათი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ბოლო 6 საათი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ბოლო 12 საათი</Dropdown.Item>
                  <Dropdown.Item eventKey="2">ბოლო 24 საათი</Dropdown.Item>
                </DropdownButton>
                <span style={{ margin: "0 2%" }}></span>
                <DropdownButton
                  id="selectDropdown"
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

              let title: manProps[] = mans.filter(
                (man) => man.man_id === prod.man_id.toString()
              );

              let q_model: modelProps[] = models.filter(
                (model) => model.model_id === prod.model_id
              );

              if (!q_model[0]) {
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
                limit={20}
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
