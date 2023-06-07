import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container } from "react-bootstrap";
import logo from "./assets/logo.png";
import { useState, useEffect } from "react";

function App() {
  type manProps = {
    man_id: number;
    man_name: string;
    is_car: number;
    is_spec: number;
    is_moto: number;
  };
  type modProps = {
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
  const [models, setModels] = useState<modProps[]>([]);
  const [categorys, setCategorys] = useState<categoryProps[]>([]);
  const [prod, setProd] = useState<prodAPI | null>(null);
  const [products, setProducts] = useState<itemProps[]>([]);

  function GetModels(id: number) {
    const url = "https://api2.myauto.ge/ka/getManModels?man_id=" + id;

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data: modProps[]) => setModels(data));
    });
  }

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
    fetch("https://api2.myauto.ge/ka/products/")
      .then((response) => response.json())
      .then((data: prodAPI) => {
        if (data) {
          setProducts(data.data.items);
        }
      });
  }, []);

  if (mans.length === 0 && categorys.length === 0 && products.length === 0) {
    return (
      <div>
        <h1>Loading</h1>
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
              width="141"
              height="45"
              className="d-inline-block align-top logo"
              alt="React Bootstrap logo"
            />
          </Container>
        </div>
      </Navbar.Brand>
      <Container className="main">
        <p>cool</p>
        {products.map((man) => {
          return <h1>{man.cylinders}</h1>;
        })}
      </Container>
    </div>
  );
}

export default App;
