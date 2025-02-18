import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import { getComboProductById } from '../services/operations/productAPI';
import { toast } from 'react-hot-toast';
import {useDispatch} from 'react-redux';  
import {addToCart} from '../slices/cartSlice';
import RatingStars from '../common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import AddReview from '../common/AddReview';
import NavBar from '../common/NavBar';
// import {createRating} from "../services/operations/productAPI";
const ComboProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to handle errors
  const [selectedImage, setSelectedImage] = useState(''); // State for selected image
  const [quantity, setQuantity] = useState(1); // State for quantity
  const dispatch = useDispatch();

    const [avgReviewCount, setAvgReviewCount] = useState(0);
  
    useEffect(() => {
      const count = GetAvgRating(product?.ratings);
      // console.log("count",count)
      setAvgReviewCount(count);
    }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getComboProductById(id); // Fetch product data by ID
        if (response?.data?.data) {
          const productData = response.data.data;
          setProduct(productData);
          setSelectedImage(productData.images[0]); // Set the first image as the default
        } else {
          throw new Error('Invalid API response structure');
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Error fetching product details');
        toast.error('Error fetching product details');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (id) {
      fetchProduct(); // Fetch only if ID exists
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity, price: product.price }));
      toast.success("Combo product added to cart");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Add logic for Buy Now functionality
      const data={...product,quantity}
      navigate('/checkout',{state:{products:[data]}});
      console.log(product,quantity)
      toast.success("To buy");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg font-semibold text-red-500">{error}</div>;
  }

  return (
    <><NavBar />
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Product Images Section */}
      <div className="lg:flex lg:gap-10">
        <div className="lg:w-1/2">
          <div className="border rounded-lg overflow-hidden w-full h-96">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover border-2 rounded cursor-pointer ${
                  selectedImage === image ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name || 'No Name Available'}</h1>
          <div className="text-md flex flex-wrap items-center gap-2">
                <RatingStars Review_Count={avgReviewCount} />
                <span>{`(${product?.ratings.length} reviews)`}</span>
          </div>
          <p className="text-gray-600 text-sm">{product.description || 'No description available'}</p>

          {product.heading && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{product.heading}</h2>
              {product.subHeading?.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {product.subHeading.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {product.pricePerWeight?.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold">Price Options:</h3>
              <div className="space-y-2">
                {product.pricePerWeight.map((option) => (
                  <p key={option._id} className="text-sm text-gray-700">
                    {option.weightInGrams}g - ₹{option.price}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-blue-500">₹{product.price || 'N/A'}</p>
          )}

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
          {
            product.status==='available'?(
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
            ):(<p>Product is unavailable</p>)
          }
        </div>
      </div>
      <AddReview comboProductId={id} />
    </div>
    </>
  );
};

export default ComboProductDetail;
