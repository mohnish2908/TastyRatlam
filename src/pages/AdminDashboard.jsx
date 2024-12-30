import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar"; // Assuming you have a NavBar component
import {
  getAllComboProducts,
  getAllProducts,
  deleteProduct,
  deleteComboProduct,
  addComboProduct,
  addProduct,
} from "../services/operations/productAPI"; // API functions
// import { Link } from "react-router-dom"; // For navigation
import { logout } from "../services/operations/authAPI"; // For logout
import { toast } from "react-hot-toast"; // For loading and error messages
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";


const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.loading("Fetching Products...");
        const response = await getAllProducts();
        setProducts(response.data.data);
        toast.dismiss();

        toast.loading("Fetching Combo Products...");
        const comboResponse = await getAllComboProducts();
        setComboProducts(comboResponse.data.data);
        toast.dismiss();
      } catch (err) {
        setError("Error fetching products or combo products");
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      toast.loading("Deleting Product...");
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.dismiss();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  const handleDeleteComboProduct = async (id) => {
    try {
      toast.loading("Deleting Combo Product...");
      await deleteComboProduct(id);
      setComboProducts((prev) =>
        prev.filter((comboProduct) => comboProduct._id !== id)
      );
      toast.dismiss();
      toast.success("Combo Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting combo product");
    }
  };



  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  const renderProductCard = (product, isCombo = false) => {
    const { _id, name, description, images, pricePerWeight, price } = product;
    return (
      <div
        key={_id}
        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
        <img
          src={
            images && images.length > 0
              ? images[0]
              : "https://via.placeholder.com/150"
          }
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
          {pricePerWeight ? (
            <div className="mt-4 space-y-1">
              {pricePerWeight.map((option) => (
                <p key={option._id} className="text-sm text-gray-700">
                  {option.weightInGrams}g - ₹{option.price}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-900 mt-4">₹{price}</p>
          )}
        </div>
        {isAdmin && (
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() =>
                isCombo
                  ? handleDeleteComboProduct(_id)
                  : handleDeleteProduct(_id)
              }
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
        <button
          className="bg-blue-100 text-black px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="p-4 bg-gray-100 border-t border-gray-200 mt-4">
          <Link
            to="/add-product"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >Add Product</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => renderProductCard(product))}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
          Combo Products
        </h1>
        
        <div className="p-4 bg-gray-100 border-t border-gray-200">
        <Link
            to="/add-combo-product"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >Add Combo Product</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {comboProducts.map((comboProduct) =>
            renderProductCard(comboProduct, true)
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
