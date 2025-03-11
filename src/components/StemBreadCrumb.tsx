import React from 'react'
import breadcrumb from '../assets/breadCrumb.svg'
import crLogo from '../assets/crLogo.svg'

function StemBreadCrumb() {
  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
        {/* <span className="text-blue-600 text-lg font-medium cursor-pointer">↻</span> */}
        <img src={crLogo}/>
        {/* <span className="mx-2 text-gray-500">{'>'}</span> */}
        <img src={breadcrumb}/>
        <span className="text-gray-700 font-medium">STEM Assessment</span>
      </div>
  )
}

export default StemBreadCrumb
