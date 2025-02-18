import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "./RatingStars";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, images, pricePerWeight, ratings } = data;
  const [selectedOption, setSelectedOption] = useState(
    pricePerWeight && pricePerWeight.length > 0 ? pricePerWeight[0]._id : null
  );
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(ratings);
    setAvgReviewCount(count);
  }, [ratings]);

  const handleAddToCart = () => {
    if (pricePerWeight && selectedOption) {
      const selectedWeight = pricePerWeight.find(
        (option) => option._id === selectedOption
      );
      dispatch(
        addToCart({
          ...data,
          selectedOption,
          selectedWeight,
          weightInGrams: selectedWeight.weightInGrams,
          price: selectedWeight.price,
        })
      );
      toast.success("Product added to cart");
    } else if (!pricePerWeight) {
      dispatch(addToCart({ ...data }));
      toast.success("Combo product added to cart");
    } else {
      toast.error("Please select a weight option");
    }
  };

  const handleProductClick = (e) => {
    e.stopPropagation();
    if (pricePerWeight) {
      navigate(`/product/${data._id}`);
    } else {
      navigate(`/combo-product/${data._id}`);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden max-w-sm mx-auto h-[500px] flex flex-col">
      <img
        src={
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/150"
        }
        alt={name}
        className="object-cover cursor-pointer"
        onClick={handleProductClick}
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="cursor-pointer" onClick={handleProductClick}>
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-2">
            {name}
          </h2>
          <div className="flex items-center justify-center mb-2">
            <RatingStars reviewCount={avgReviewCount} />
            <span className="ml-1 text-gray-600">({ratings.length})</span>
          </div>
        </div>
        {pricePerWeight && (
          <div className="mt-4">
            <select
              id="pricePerWeight"
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        <div className="mt-auto p-4 bg-gray-100 border-t border-gray-200">
          <button
            className="bg-black text-white px-4 py-2  w-full transform transition-transform duration-200 hover:scale-105 hover:border hover:border-blue-500"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;