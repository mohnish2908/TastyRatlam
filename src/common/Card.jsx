import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { deleteProduct } from "../services/operations/productAPI";
import { deleteComboProduct } from "../services/operations/productAPI";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.admin);
  const { name, description, images, pricePerWeight, price } = data;



  // Function for adding product to cart (non-admin users)
  const handleAddToCart = (id) => {
    // Handle adding the product to cart logic
    toast.success("Product added to cart");
  };

  // Function for buying product (non-admin users)
  const handleBuyNow = (id) => {
    // Handle buying the product logic
    toast.success("Proceeding to checkout");
    navigate("/checkout");  // Redirect to checkout page
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img
        src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/150"}
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

      <>
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => handleAddToCart(data._id)}
            >
              Add to Cart
            </button>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={() => handleBuyNow(data._id)}
            >
              Buy Now
            </button>
          </div>
        </>
    </div>
  );
};

export default Card;
