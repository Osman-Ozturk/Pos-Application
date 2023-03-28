
import Header from "../components/header/Header.jsx";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import CreateBill from "../components/cartTotals/CreateBill.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  minusQuantity,
  plusQuantity,
  reset,
} from "../redux/cartSlice.js";
import { Button, Card, Input, message, Popconfirm, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      width: 8,
      ...getColumnSearchProps("title")
    },
    {
      title: "Product Image",
      dataIndex: "img",
      key: "title",
      render: (_, record) => {
        return <img src={record.img} />;
      },
      width: 8,
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "title",
      width: 8,
      render: (text) => <span>{text} €</span>,
      sorter:(a,b)=> a.price-b.price
    },

    {
      title: "Product Category",
      dataIndex: "category",
      key: "category",
      width: 8,
      ...getColumnSearchProps("category")
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "title",
      width: 8,
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(plusQuantity(record))}
          />
          <span>{record.quantity}</span>
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
            onClick={() => dispatch(minusQuantity(record))}
          />
          <sp />
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "title",
      width: 8,
      render: (_, record) => (
        <span>{Number(record.price * record.quantity).toFixed(2)} €</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 8,

      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              danger
              onClick={() => dispatch(deleteProduct(record))}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className="px-6">
        <Table dataSource={cart.cartItems} columns={columns} bordered  scroll={{x:1200,y:300}}/>
        <div className="cart-totals flex justify-end">
          <Card className="w-72">
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
                    setIsModalOpen(true)
                    
                  }}
                  disabled={cart.cartItems.length>0 ? false:true }
                >
                  Create order
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CartPage;
