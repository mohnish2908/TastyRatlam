// Redux
import { useDispatch, useSelector } from "react-redux";
// React Router
import { Route, Routes, useNavigate } from "react-router-dom";
// Components
import LoginAdmin from "./pages/LoginAdmin";
import Home from "./pages/Home";
import AdminRoute from "./common/core/Auth/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./common/core/Product/AddProduct";
import AddComboProduct from "./common/core/Product/AddComboProduct";
import Product from "./pages/Product";
import ComboProduct from "./pages/ComboProduct";
import Error from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";
import ComboProductDetail from "./pages/ComboProductDetail";
import Cart from "./pages/Cart";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div lassName="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="admin-login-8989866833" element={<LoginAdmin />} />

        <Route
          path="admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        
        <Route
          path="add-combo-product"
          element={
            <AdminRoute>
              <AddComboProduct />
            </AdminRoute>
          }
        />

        <Route path="/products" element={<Product />} />
        <Route path="/combo-products" element={<ComboProduct />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/combo-product/:id' element={<ComboProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
