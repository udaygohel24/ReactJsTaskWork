import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import UpdateProducts from "./components/UpdateProducts";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PriveteRoute from "./components/PriveteRoute";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* aa privete route aatla page show nahi kare jya sudhi signup nai thay tya sudhi */}
          <Route element={<PriveteRoute />}>
            <Route path="/" element={<Products />} />
            <Route path="/addpro" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProducts />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>{" "}
          {/* aya sudgi na aatla page  */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
