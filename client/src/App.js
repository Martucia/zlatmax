import React from 'react';
import MainPage from "./pages/MainPage";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import CatalogPage from "./pages/CatalogPage";
import { useEffect, useState } from "react";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./components/Registration";
import Authorization from "./components/Authorization";
import { auth } from "./actions/user";
import { setCatalog } from "./actions/product";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import Editor from "./components/Editor";
import MobileHeader from "./components/Header/MobileHeader";
import AdminCatalog from "./pages/AdminCatalog";
import Spinner from './components/Spinner';

function App() {
  const [isLogOpen, openLog] = useState(false);
  const [isRegOpen, openReg] = useState(false);
  const [isBasketOpen, openBasket] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);
  // const [isEditorOpen, openEditor] = useState(false);

  const isLoading = useSelector(state => state.user.isLoading);

  const dispatch = useDispatch()

  const [page, setPage] = useState(null)


  useEffect(() => {
    dispatch(auth());
  }, [dispatch])

  useEffect(() => {
    //if (page) 
    dispatch(setCatalog(page))
  }, [dispatch, page])


  return (
    <>
      <Header setOpen={openLog} openBasket={openBasket} openLog={openLog} />
      <MobileHeader isMenuOpen={isMenuOpen} openMenu={openMenu} openBasket={openBasket} setOpen={openLog} />

      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage page={page} setPage={setPage} />} />
        <Route path="/catalog/:id/*" element={<ProductPage />} />
        <Route path="/admin-catalog/*" element={<AdminCatalog page={page} setPage={setPage} />} />
        <Route path="/admin-catalog/edit/:id" element={<Editor />} />
        <Route path="/admin-catalog/addnew" element={<Editor isNewProduct={true} />} />
      </Routes>
      <Footer />

      {isLoading && <Spinner />}

      {isBasketOpen && <Basket isOpen={isBasketOpen} closeBasket={openBasket} />}

      {isLogOpen && <Authorization isActive={isLogOpen} openLog={openLog} openReg={openReg} />}

      {isRegOpen && <Registration isActive={isRegOpen} openReg={openReg} openLog={openLog} />}

    </>
  );
}

export default App;
