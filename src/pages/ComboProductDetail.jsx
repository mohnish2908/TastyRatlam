import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComboProductById } from '../services/operations/productAPI';
import { toast } from 'react-hot-toast';

const ComboProductDetail = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL parameters
  console.log('Product ID:', id);
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getComboProductById(id); // Pass product ID to the API
        console.log('Product details:', response);
        if (response?.data?.data) {
          setProduct(response.data.data);
        } else {
          throw new Error('Invalid API response structure');
        }
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Error fetching product details');
        toast.error('Error fetching product details');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (id) {
      fetchProduct(); // Only fetch if ID exists
    }
  }, [id]); // Run effect when ID changes

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{product?.name || 'No Name Available'}</h1>
      <img
        src={product?.images?.[0] || 'https://via.placeholder.com/150'}
        alt={product?.name || 'Product Image'}
        className="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
      />
      <p className="text-gray-600 text-sm mt-2">{product?.description || 'No description available'}</p>
      {product?.heading && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">{product.heading}</h2>
          {product.subHeading && product.subHeading.length > 0 && (
            <ul className="list-disc list-inside mt-2">
              {product.subHeading.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {product?.pricePerWeight?.length > 0 ? (
        <div className="mt-4 space-y-1">
          {product.pricePerWeight.map((option) => (
            <p key={option._id} className="text-sm text-gray-700">
              {option.weightInGrams}g - ₹{option.price}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-lg font-bold text-gray-900 mt-4">₹{product?.price || 'N/A'}</p>
      )}
    </div>
  );
};

export default ComboProductDetail;
