import React from 'react'

const AuthCarousel = ({title,subtitle,img}) => {
  return (
        <div >
        <div className="flex justify-center items-center">
        <img src={img} alt="" className="w-[600px] h-[600px] "/>
        </div>
        
        <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
        <p className="text-center text-xl text-white mb-8">{subtitle}</p>
      </div>
  )
}

export default AuthCarousel
