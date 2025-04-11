import React from 'react'
import "./Intro.css";
import Navbar from "../../component/Navbar/Navbar";
import Header from "../../component/Header/Header";
import Campus from "../../component/Campus/Campus";
import Footer from "../../component/Footer/Footer";
import Banner from "../../component/Banner/Banner";
import Intro_container from '../../component/Intro_container/Intro_container';
const Intro = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Banner />
      <Intro_container />
      <Campus/>
      <Footer/>
    </div>
  )
}

export default Intro
