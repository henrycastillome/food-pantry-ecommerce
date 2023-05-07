import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(()=>{
    setTimeout(() => {
        setIsLoading(false);
      }, 1500);

  },[]) 

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header isHomePage />
          <Hero />
          <ProductSection />
          <Footer />
        </>
      )}
    </main>
  );
};

export default HomePage;
