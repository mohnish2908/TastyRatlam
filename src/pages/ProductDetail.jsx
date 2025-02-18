import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getProductById } from "../services/operations/productAPI";
import { toast } from "react-hot-toast";
import Navbar from "../common/NavBar";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import RatingStars from "../common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import AddReview from "../common/AddReview";
import {CheckOut} from './CheckOut';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // State for main image
  const [selectedOption, setSelectedOption] = useState(null); // State for selected weight option
  const [price, setPrice] = useState(0); // State for price based on weight
  const [quantity, setQuantity] = useState(1); // State for quantity
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("product in detail", product);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response?.data?.data) {
          const productData = response.data.data;
          // console.log("p", productData);
          setProduct(productData);
          setSelectedImage(productData.images[0]); // Set the first image as default
          if (productData.pricePerWeight?.length > 0) {
            setSelectedOption(productData.pricePerWeight[0]._id); // Set default weight option
            setPrice(productData.pricePerWeight[0].price); // Set default price
          }
        } else {
          throw new Error("Invalid API response structure");
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error fetching product details");
        toast.error("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);
  
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(product?.ratings);
    // console.log("count",count)
    setAvgReviewCount(count);
  }, [product]);
  const handleWeightChange = (weightId) => {
    setSelectedOption(weightId);
    const selectedWeight = product.pricePerWeight.find(
      (option) => option._id === weightId
    );
    if (selectedWeight) {
      setPrice(selectedWeight.price);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedOption) {
      const selectedWeight = product.pricePerWeight.find(
        (option) => option._id === selectedOption
      );
      dispatch(
        addToCart({
          ...product,
          selectedOption,
          selectedWeight,
          quantity,
          weightInGrams:selectedWeight.weightInGrams,
          price: selectedWeight.price,
        })
      );
      toast.success("Product added to cart");
    } else if (!product.pricePerWeight) {
      dispatch(addToCart({ ...product, quantity, price }));
      toast.success("Combo product added to cart");
    } else {
      toast.error("Please select a weight option before adding to cart");
    }
  };

  const handleBuyNow = () => {
    console.log("aaaaaaa");
    if (product && selectedOption) {
      const selectedWeight = product.pricePerWeight.find(
        (option) => option._id === selectedOption
      );
      // dispatch(addToCart({ ...product, selectedOption, selectedWeight, quantity, price: selectedWeight.price }));
      const data = { ...product, selectedOption, selectedWeight, quantity, price: selectedWeight.price };
      console.log(
        data
      );
      // dispatch(checkout(data))
      navigate('/checkout', { state: { products: [data] } });
      toast.success("To buy");
    }
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

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1">
          <div className="border rounded-lg overflow-hidden w-full h-96">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover border-2 rounded cursor-pointer ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="text-md flex flex-wrap items-center gap-2">
                <RatingStars Review_Count={avgReviewCount} />
                <span>{`(${product?.ratings.length} reviews)`}</span>
          </div>

          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-blue-500">₹{price}</p>

          {/* Weight Selection */}
          <h3 className="text-lg font-semibold">Select Weight:</h3>
          <div className="flex flex-wrap gap-4">
            {product.pricePerWeight.map(({ weightInGrams, price, _id }) => (
              <label key={_id} className="cursor-pointer">
                <input
                  type="radio"
                  name="weightOption"
                  value={_id}
                  checked={selectedOption === _id}
                  onChange={() => handleWeightChange(_id)}
                  className="hidden"
                />
                <div
                  className={`px-4 py-2 rounded border-2 ${
                    selectedOption === _id
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  {weightInGrams}g
                </div>
              </label>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-lg font-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          {/* Heading and Subheadings */}
          <h2 className="text-lg font-semibold">{product.heading}</h2>
          <ul className="list-disc pl-5">
            {product.subHeading.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
      </div>
      <AddReview productId={id} />
    </>
  );
};

export default ProductDetail;
