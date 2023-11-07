import Product from "./pages/Product";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NewProduct from "./pages/newProduct/NewProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct"; 
import UserList from "./pages/userList/UserList";
import CommandeList from "./pages/listCommande/CommandeList";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.user);
  
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<Home />} />  
        {/* <Route path="/products/:category" element={<ProductList />} /> */}
        <Route path="/product/:id"  element={<Product />} />
        <Route path="/cart" element={(!user.isConnect || user.isAdmin) ? <Navigate to="/login" /> : <Cart />} />
        <Route path="/login" element={user.isConnect ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user.isConnect ? <Navigate to="/" /> : <Register />} />
        <Route path="/add" element={ !(user.isAdmin) ? <Navigate to="/login" /> :    <NewProduct />} />
        <Route path="/update/:id" element={ !user.isAdmin  ? <Navigate to="/login" /> : <UpdateProduct />} />
        <Route path="/user-list" element={!user.isAdmin   ? <Navigate to="/" />   :  <UserList /> } />
        <Route path="/commandes" element={!user.isAdmin   ? <Navigate to="/" />   :  <CommandeList /> } />
        
      </Routes>
    </Router>
  );
};

export default App;
