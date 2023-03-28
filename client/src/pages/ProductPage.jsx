import React,{useEffect,useState} from 'react'
import Header from "../components/header/Header.jsx"
import Edit from '../components/products/Edit.jsx'
const ProductPage = () => {

  return (
    <>
    <Header />
    <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Products</h1>
        <Edit />
    </div>
    </>
  )
}

export default ProductPage