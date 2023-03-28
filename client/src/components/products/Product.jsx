import { addProduct } from "../../redux/cartSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { message } from "antd";

const Product = ({ product }) => {
  const cart =useSelector(state => state.cart)
  const dispatch = useDispatch()
  const handleClick = (product)=>{
    dispatch(addProduct({...product,quantity:1}))
    message.success("Product added to Cart")
  }
  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none" onClick={()=>handleClick(product)}>
        <div className="product-img">
          <img
            src={product.img}
            alt=""
            className="h-28 object-contain w-full border-b"
          />
        </div>
        <div className="product-info flex flex-col p-3">
          <span className="font-bold">{product.title}</span>
          <span>{product.price} €</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
