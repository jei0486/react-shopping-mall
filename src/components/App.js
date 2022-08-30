import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for this product
import MainPage from "./MainPage/MainPage.js";
import LoginPage from "./LoginPage";
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer.js"
import UploadProduct from './UploadProduct'
import DetailProduct from './DetailProduct/DetailProduct';
// import CartPage from './views/CartPage/CartPage';
import HistoryPage from './HistoryPage.js';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
     <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
       <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
         <Routes>
          {/* <Route exact path="/" element={Auth(MainPage, null)} /> */}
          {/*  <Route exact path="/login" element={Auth(LoginPage, false)} /> */}
           {/*  <Route exact path="/history" element={Auth(HistoryPage, true)} /> */}
           {/* <Route exact path="/product/upload" element={Auth(UploadProduct, true)} /> */}
           {/* <Route exact path="/product/:productId" element={Auth(DetailProduct, null)} /> */}

           {/* TODO */}
           {/* <Route exact path="/register" element={Auth(RegisterPage, false)} /> */}
           {/* <Route exact path="/user/cart" element={Auth(CartPage, true)} /> */} 
          
           <Route exact path="/" element={<MainPage/>} />
           <Route exact path="/login" element={<LoginPage/>} />
           <Route exact path="/history" element={<HistoryPage/>} />
           <Route exact path="/product/upload" element={<UploadProduct/>} />
           <Route exact path="/product/:productId" element={<DetailProduct/>} />
         </Routes>
       </div>
       <Footer />
     </Suspense>
  );
}

export default App;
