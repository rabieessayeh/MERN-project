import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";



const Home = () => {

  return (
    <div>
      <Navbar />
    
  
      <Products/>
     
      <Footer/>
    </div>
  );
};

export default Home;
