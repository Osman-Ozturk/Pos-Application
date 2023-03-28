import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Add from "./Add.jsx";
import Edit from "./Edit.jsx";
import Product from "./Product.jsx";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const Products = ({ products, setProducts, categories, setCategories ,filtered,search}) => {
  const [isAddProductModal, setIsAddProductModal] = useState(false);
  const navigate =useNavigate()
  return (
    <>
      <div className="products-wrapper grid grid-cols-card gap-4">
        {products.length > 0 &&
          filtered?.filter(item => item.title.toLowerCase().includes(search)).map((product) => <Product product={product} />)}

        <div
          className="product-item border hover:shadow-lg cursor-pointer transition-all select-none !bg-purple-800 hover:opacity-90 text-white flex justify-center items-center min-h-[180px]"
          onClick={() => setIsAddProductModal(true)}
        >
          <PlusOutlined className="md:text-2xl" />
        </div>
        <div
          className="product-item border hover:shadow-lg cursor-pointer transition-all select-none text-white flex justify-center items-center !bg-orange-800 hover:opacity-90 min-h-[180px]"
          onClick={() => navigate("/products")}
        >
            <EditOutlined className="md:text-2xl"  />
          
        </div>
      </div>
      <Add
        categories={categories}
        setCategories={setCategories}
        isAddProductModal={isAddProductModal}
        setIsAddProductModal={setIsAddProductModal}
        products={products}
        setProducts={setProducts}
      />
     
    </>
  );
};

export default Products;
