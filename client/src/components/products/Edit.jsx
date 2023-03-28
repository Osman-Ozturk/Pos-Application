import { Button, Form, Input, message, Modal, Table ,Select} from "antd";
import React,{useState,useEffect} from "react";

const Edit = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState({});

  useEffect(() => {
   
    const getProducts = async () => {
      try {
        await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/getAll")
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((err) => console.log(err));
        
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
   
    const getCategories = async () => {
      try {
        await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/getAll")
          .then((response) => response.json())
          .then((data) => setCategories(data.map(item => {return {...item,value:item.title}})))
          .catch((err) => console.log(err));
        
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update", {
        method: "PUT",
        body: JSON.stringify({ ...values,productId:editingItem._id}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("The Product has been successfully updated.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values
          }
           return item
        })
      );
      setIsEditModalOpen(false)
    } catch (error) {
      message.success("Something went wrong.");
      console.log(error);
    }
  };
  const deleteHandler =  (id)=>{
    window.confirm("Are you sure you want to delete the product?")
        try {
                  fetch(`process.env.REACT_APP_SERVER_URL + "/api/products/delete`, {
                        method: "DELETE",
                        body:JSON.stringify({productId: id}),
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                      });
                      message.success("The Product has been successfully deleted")
        } catch (error) {
             message.success("Something went wrong")   
             console.log(error);
        }
  }
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      width:8,
      render: (_, record) => {
          return (
            <p>{record.title}</p>
          );
        
      },
    },
    {
      title: "Product Img",
      dataIndex: "img",
      width:8,
      render:(_,record) =>{
        return <img src={record.img} className="w-full h-40 object-container"/>
      }

    },
    {
      title: "Product Price",
      dataIndex: "price",
      width:8,

    },
    {
      title: "Category",
      dataIndex: "category",
      width:8,

    },
    {
      title: "Action",
      dataIndex: "action",
      width:8,

      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={()=>{
                setIsEditModalOpen(true)
                setEditingItem(record)
              }}
            >
              Edit
            </Button>
            
            <Button type="link" danger
             onClick={()=>deleteHandler(record._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
  
      <>
        <Table
          bordered
          dataSource={products}
          columns={columns}
          rowKey={"_id"}
          scroll={{x:1000,y:600}}
        />
         <Modal
      title="Update Product "
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
        <Form.Item
          name="title"
          label="Product Name"
          rules={[{ required: true, message: "Write a product name!" }]}
        >
          <Input  placeholder="Enter the product name." />
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
          <Input placeholder="Enter the Product Price." />
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
      </>
  );
};
export default Edit;
