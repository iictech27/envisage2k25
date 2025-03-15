import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";


const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <Navigation />
        <Outlet />
       
      </main>
      <Footer />
    </>
  );
};

export default Layout;
