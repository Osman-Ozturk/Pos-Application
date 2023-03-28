import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

const Add = ({
  isAddProductModal,
  setIsAddProductModal,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("The Product has been successfully added.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddProductModal(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add New Product "
      open={isAddProductModal}
      onCancel={() => setIsAddProductModal(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Product Name"
          rules={[{ required: true, message: "Write a product name!" }]}
        >
          <Input placeholder="Enter the product name." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product img"
          rules={[
            { required: true, message: "Write a product image!" },
          ]}
        >
          <Input placeholder="Enter the Product Image" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            { required: true, message: "Write a product price" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select Category"
          rules={[{ required: true, message: "Write a product category" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Created
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;