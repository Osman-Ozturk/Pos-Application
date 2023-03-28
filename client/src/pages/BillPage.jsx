import React, { useState,useEffect,useRef } from "react";
import Header from "../components/header/Header.jsx";
import { Table, Card, Button ,Input,Space , Spin} from "antd";
import PrintBill from "../components/bills/PrintBill.jsx";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const BillPage = () => {
  const [bills,setBills]=useState()
  const [customer, setCustomer] = useState({})
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
  useEffect(() => {
    const getBills =  ()=>{
       fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/getAll").then(response => response.json()).then(data => setBills(data)).catch(error => console.log(error))
    }
    getBills()
  }, [])
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName")
    },
    {
      title: "Customer Phone Number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text)=>{
        return <span>{text.substring(0, 10).split("-")[2]+"."+text.substring(0, 10).split("-")[1]+"."+text.substring(0, 10).split("-")[0]}</span>
      }
    },
    {
      title: "Payment Methode",
      dataIndex: "paymentMethode",
      key: "paymentMode",
      ...getColumnSearchProps("paymentMethode")
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
      key: "id",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render:(text)=>{
        return <span>{text}€</span>
      },
      sorter:(a,b)=> a.totalAmount-b.totalAmount
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_,record)=>{
        return <Button type="link" className="pl-0" onClick={()=> {
          setIsModalOpen(true)
          setCustomer(record)
        }}>Print</Button>
      }
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />
        <h1 className="text-4xl text-center">Bills</h1>
      {bills ? (<div className="px-6">
        <Table dataSource={bills} columns={columns} bordered scroll={{x:1000,y:300}} rowKey="_id"/>
        <div className="cart-totals flex justify-end">
          <Card className="w-72">
            <div className="cart-totals mt-auto">
              
              <div className="py-4 px-2">
                <Button
                  type="primary"
                  size="large"
                  className="w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Print
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>):<Spin
        size="large"
        className="absolute top-1/2 h-screen w-screen flex justify-center"
      />}
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer}/>
    </div>
  );
};

export default BillPage;
