import React from "react";
import { Button, Form, Input, Select, Modal, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice.js";
import { useNavigate } from "react-router-dom";
const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const navigate =useNavigate()
  const onFinish =async (values) => {
    const data = {...values,subTotal :cart.total,
      tax:((cart.total * cart.tax) / 100).toFixed(2),
      totalAmount:Number(cart.total + (cart.total * cart.tax) / 100).toFixed(2),
      cartItems : cart.cartItems}
      try {
       const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add",{
        method:"POST",
        body:JSON.stringify({...values,
          subTotal :cart.total,
          tax:((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount:Number(cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems : cart.cartItems
          
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      if (res.ok) {
       message.success("invoice created successfully") 
       dispatch(reset())
       navigate("/bills")
      }
      setIsModalOpen(false)
    } catch (error) {
      console.log(error);
    } 
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  return (
    <Modal
      title="Bills"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="customerName"
          label="Customer name"
          rules={[{ required: true, message: "Please input CustomerName!" }]}
        >
          <Input placeholder="write a customer name" />
        </Form.Item>
        <Form.Item
          name="customerPhoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: "Please input Phone Number!" }]}
        >
          <Input placeholder="write a phone number" maxLength="11" />
        </Form.Item>
        <Form.Item
          name="paymentMethode"
          label="Payment Method"
          rules={[{ required: true, message: "Please input Payment Methode!" }]}
        >
          <Select placeholder="please choose a payment method">
            <Select.Option value="cash" name="cash">
              Cash
            </Select.Option>
            <Select.Option value="crediat cart" name="crediat cart">
              Crediat Cart
            </Select.Option>
          </Select>
        </Form.Item>
        <Card>
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
                  {Number(cart.total + (cart.total * cart.tax) / 100).toFixed(
                    2
                  )}{" "}
                  €{" "}
                </span>
              </div>
            </div>
            <div className="py-4 px-2">
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={() => {
                  setIsModalOpen(false)
                }}
                htmlType="submit"
                disabled={cart.cartItems.length >0 ? false:true}
              >
                Create order
              </Button>
            </div>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
