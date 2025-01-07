import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, description, images, pricePerWeight } = data;

  const [selectedOption, setSelectedOption] = useState(
    pricePerWeight && pricePerWeight.length > 0 ? pricePerWeight[0]._id : null
  );

  // Function for adding product to cart (non-admin users)
  const handleAddToCart = () => {
    if (pricePerWeight && selectedOption) {
      const selectedWeight = pricePerWeight.find(option => option._id === selectedOption);
      dispatch(addToCart({ ...data, selectedOption, selectedWeight }));
      toast.success("Product added to cart");
    } else if (!pricePerWeight) {
      dispatch(addToCart({ ...data }));
      toast.success("Combo product added to cart");
    } else {
      toast.error("Please select a weight option");
    }
  };

  // Function for navigating to product detail page
  const handleProductClick = (e) => {
    e.stopPropagation(); // Prevent unintended clicks on dropdown triggering this
    navigate(`/product/${data._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img
        src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/150"}
        alt={name}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={handleProductClick}
      />
      <div className="p-4 cursor-pointer" onClick={handleProductClick}>
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        {pricePerWeight && (
          <div className="mt-4" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="pricePerWeight" className="text-sm font-medium text-gray-700">
              Select Weight:
            </label>
            <select
              id="pricePerWeight"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {pricePerWeight.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.weightInGrams}g - ₹{option.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-100 border-t border-gray-200">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;