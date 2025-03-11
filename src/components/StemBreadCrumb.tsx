
import React from 'react'
import breadcrumb from '../assets/breadCrumb.svg'
import crLogo from '../assets/crLogo.svg'

function StemBreadCrumb() {
  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
        <img src={crLogo} alt="Logo"/>
        <img src={breadcrumb} alt="Breadcrumb"/>
        <span className="text-gray-700 font-medium">STEM Assessment</span>
      </div>
  )
}

export default StemBreadCrumb
