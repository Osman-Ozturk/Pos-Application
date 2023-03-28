import React from "react";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserAddOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Badge, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css"
const Header = ({setSearch}) => {
  const {cartItems} =useSelector(state => state.cart)
  const navigate=useNavigate()
  const {pathname} = useLocation()
  const logout = ()=>{
    if(window.confirm("Are you sure you want to log out?")){
      localStorage.removeItem("posAppUser")
      message.success("You have successfully logged out")
      navigate("/login")
      
    }
  }
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center items-center" onClick={()=>{pathname !== "/" && navigate("/")}}>
          <Input
            size="large"
            placeholder="product search"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]:"
            onChange={(e)=>setSearch(e.target.value.toLowerCase())}
            
          />
        </div>
        <div className="menu-links">
          <Link to="/" className={`menu-link ${
            pathname ==="/" && "active"
          }`}>
            <HomeOutlined className="text-xl  md:text-2xl" />
            <span className="text-xs md:text-[10px]">Home</span>
          </Link>
          <Badge count={cartItems?.length} offset={[0,0]} className="md:flex hidden">
            <Link
              to="/cart"
              className={`menu-link ${
                pathname ==="/cart" && "active"
              }`}
            >
              <ShoppingCartOutlined className="text-2xl" />

              <span className="text-xs md:text-[10px]">Cart</span>
            </Link>
          </Badge>
          <Link
            to="/bills"
            className={`menu-link ${
              pathname ==="/bills" && "active"
            }`}
          >
            <CopyOutlined className="text-xl  md:text-2xl" />
            <span className="text-xs md:text-[10px]">Bill</span>
          </Link>
          <Link
            to="/customers"
            className={`menu-link ${
              pathname ==="/customers" && "active"
            }`}
          >
            <UserAddOutlined className="text-xl  md:text-2xl" />
            <span className="text-xs md:text-[10px]">Customers</span>
          </Link>
          <Link
            to="/statistics"
            className={`menu-link ${
              pathname ==="/statistics" && "active"
            }`}
          >
            <BarChartOutlined className="text-xl  md:text-2xl" />
            <span className="text-xs md:text-[10px]">Statistics</span>
          </Link>
          <div
            className="menu-link "
            onClick={logout}
          >
            <LogoutOutlined className="text-xl  md:text-2xl" />
            <span className="text-xs md:text-[10px]">Logout</span>
          </div>
        </div>
        <Badge count={cartItems?.length} offset={[0,0]} className="md:hidden flex">
            <Link
              to="/cart"
              className={`menu-link ${
                pathname ==="/" && "active"
              }`}
            >
              <ShoppingCartOutlined className="text-xl  md:text-2xl" />

              <span className="text-xs md:text-[10px]">Cart</span>
            </Link>
          </Badge>
      </header>
    </div>
  );
};

export default Header;
