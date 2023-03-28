import React from "react";
import { Modal, Button, Form, Input, message } from "antd";
const Add = ({isAddModalOpen,setIsAddModalOpen,categories
  ,setCategories}) => {
        const [form] = Form.useForm();
        const onFinish = (values) => {
                try {
                  fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  });
                  message.success("The category has been successfully added.");
                  form.resetFields();
                  setCategories([
                    ...categories,
                    {
                      _id: Math.random(),
                      title: values.title,
                    },
                  ]);
                  setIsAddModalOpen(false)
                } catch (error) {
                  console.log(error);
                }
              };
  return (
        <Modal
        title="Add new Category"
        open={isAddModalOpen}
        footer={false}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Form layout="vertical"  onFinish={onFinish} form={form}>
          <Form.Item
          name="title"
            label="Add Category"
            rules={[
              {
                required: true,
                message: "Please input category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit"  >
              Creat Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default Add
