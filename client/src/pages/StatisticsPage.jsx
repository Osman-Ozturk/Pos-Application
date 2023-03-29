import React, { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
import { Area } from "@ant-design/plots";
import { Pie } from "@ant-design/plots";
import { Spin } from "antd";
const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    asyncFetch();
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/getAll")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
      
    } catch (error) {
      console.log(error);
    }}

  const asyncFetch = () => {
    fetch(
      process.env.REACT_APP_SERVER_URL + "/api/bills/getAll"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };
  

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Total",
      },
    },
  };
  const username=(JSON.parse(localStorage.getItem("posAppUser")).email);
  return (
    <>
      <Header />
      <h1 className="text-4xl text-center">Statistics</h1>
      {data?.length>0 ? (
        <div className="px-6">
        <div className="statistic-section">
          <h2>
            Welcome{" "}
            <span className="text-green-700 font-bold text-xl">{username}</span>{" "}
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 text-center my-4">
            <StatisticCard  title={"Total Customers"} amount={data?.length} img={"images/user.png"}/>
            <StatisticCard title={"Total Earnings"} amount={data?.reduce((acc,curr)=>acc+curr.totalAmount,0).toFixed(2)+"€"} img={"images/money.png"}/>
            <StatisticCard title={"Total Sales"} amount={data?.length} img={"images/sale.png"}/>
            <StatisticCard title={"Total Products"} amount={products?.length} img={"images/product.png"}/>
          </div>
        </div>
        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center my-10">
          <div className="lg:w-1/2 lg:h-80 h-72">
            <Area {...config} />
          </div>
          <div className="lg:w-1/2 lg:h-80 h-72">
            <Pie {...config2} />
          </div>
        </div>
      </div>
      ):(
<Spin
        size="large"
        className="absolute top-1/2 h-screen w-screen flex justify-center"
      />
      )}
      
      
    </>
  );
};

export default StatisticPage;
