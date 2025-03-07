import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import Home from "./pages/Home";
import AdminRoute from "./common/core/Auth/AdminRoute";
import BuyRoute from "./common/core/Auth/BuyRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./common/core/Product/AddProduct";
import AddComboProduct from "./common/core/Product/AddComboProduct";
import AddPromoCode from "./common/core/Product/AddPromoCode";
import Product from "./pages/Product";
import ComboProduct from "./pages/ComboProduct";
import Error from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";
import ComboProductDetail from "./pages/ComboProductDetail";
import Cart from "./pages/Cart";
import LoginUser from "./pages/LoginUser";
import VerifyOTP from "./pages/VerifyOTP";
import CheckOut from "./pages/CheckOut";
import OrderAdmin from '../src/common/core/OrderAdmin/OrderAdmin'
import Order from "./pages/Order";
import OrderDetail from './pages/OrderDetail'
import OrderDetailAdmin from "./common/core/OrderAdmin/OrderDetailAdmin";
import BulkOrder from "./pages/BulkOrder";
import About from "./pages/About";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className=" bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
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
        <Route path='add-promo-code' element={
            <AdminRoute>
              <AddPromoCode />
            </AdminRoute>
          }  />
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
        <Route
          path="order-admin"
          element={
            <AdminRoute>
              <OrderAdmin />
            </AdminRoute>
          }
        />
        <Route path='/order-admin/:id' element={
            <AdminRoute>
              <OrderDetailAdmin />
            </AdminRoute>
          } />
        <Route path="/products" element={<Product />} />
        <Route path="/combo-products" element={<ComboProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/combo-product/:id" element={<ComboProductDetail />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/bulk-order' element={<BulkOrder />} />
        <Route
          path="/checkout"
          element={
            <BuyRoute>
              <CheckOut />
            </BuyRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <BuyRoute>
              <Order />
            </BuyRoute>
          }
        />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="*" element={<Error />} />
        <Route path='about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;