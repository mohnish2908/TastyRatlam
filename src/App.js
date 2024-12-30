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

          <Route path="*" element={<Home />} />
        
      </Routes>
    </div>
  );
}

export default App;
