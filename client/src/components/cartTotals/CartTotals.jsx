import React from "react";
import { Button, message } from "antd";
import {useNavigate} from "react-router-dom"
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  plusQuantity,
  minusQuantity,
  reset,
} from "../../redux/cartSlice.js";
const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
const navigate =useNavigate()
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center text-white font-bold py-4 ">
        Product in the Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.map((item) => (
          <li className="cart-item flex justify-between items-center">
            <div>
              <img
                src={item.img}
                alt=""
                className="w-16 h-16 object-cover cursor-pointer"
                onClick={() => {
                  dispatch(deleteProduct(item));
                  message.success("Product cleared");
                }}
              />
              <div>
                <b>{item.title}</b>{" "}
                <span>
                  {item.price}€ * {item.quantity}{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
                onClick={() => dispatch(plusQuantity(item))}
              />
              <span>{item.quantity}</span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
                onClick={() => dispatch(minusQuantity(item))}
              />
              <sp />
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0} € </span>
          </div>
        </div>
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>KDV % {cart.tax}</b>
            <span className="text-red-500">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}{" "}
              €{" "}
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Total </b>
            <span className="text-xl">
              {Number(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} €{" "}
            </span>
          </div>
        </div>
        <div className="md:py-2 py-12 px-2">
          <Button 
          type="primary" 
          size="large" 
          className="w-full"
          disabled={cart.cartItems.length>0 ? false:true }
          onClick={()=>navigate("/cart")}
          >
            Create order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            danger
            disabled={cart.cartItems.length>0 ? false:true }
            icon={<ClearOutlined />}
            onClick={() => {
              if (
                window.confirm("are you sure you want to delete the products?")
              ) {
                dispatch(reset());
                message.success("cart cleared");
              }
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
