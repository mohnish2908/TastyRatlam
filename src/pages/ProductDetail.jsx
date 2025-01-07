import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/operations/productAPI';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response?.data?.data) {
          setProduct(response.data.data);
        } else {
          throw new Error('Invalid API response structure');
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error fetching product details');
        toast.error('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product?.name || 'No Name Available'}</h1>

      {/* Product Image */}
      <img
        src={product?.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={product?.name || 'Product Image'}
        className="w-full max-h-64 object-cover mb-6 rounded-lg"
      />

      {/* Description */}
      <p className="text-gray-600 text-sm">{product?.description || 'No description available'}</p>

      {/* Heading & Subheadings */}
      {product?.heading && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">{product.heading}</h2>
          {product.subHeading && product.subHeading.length > 0 && (
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {product.subHeading.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Pricing Details */}
      {product?.pricePerWeight?.length > 0 ? (
        <div className="mt-6 space-y-2">
          {product.pricePerWeight.map((option) => (
            <p key={option._id} className="text-sm text-gray-700">
              {option.weightInGrams}g - ₹{option.price}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-lg font-bold text-gray-900 mt-6">
          ₹{product?.price || 'Pricing details not available'}
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
