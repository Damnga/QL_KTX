import React from 'react'
import "./Header_admin.css"
const Header_admin = () => {
  return (
    <header className="custom-header">
      <div className="breadcrumb">
       <span className="current-page">Dashboard</span>
      </div>
      <div className="header-controls">
        <span className="icon">⚙️</span>
        <span className="icon">👤</span>
      </div>
    </header>
  )
}

export default Header_admin