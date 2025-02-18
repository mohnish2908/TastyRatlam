import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar"; // Assuming you have a NavBar component
import {
  getAllComboProducts,
  getAllProducts,
} from "../services/operations/productAPI"; // API functions
import { toast } from "react-hot-toast"; // For loading and error messages
import Card from "../common/Card"; // Assuming you have a Card component

const ComboProduct = () => {
  const [products, setProducts] = useState([]);
  // const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // toast.loading("Fetching Products...");
        const response = await getAllComboProducts();
        setProducts(response.data.data);
        // toast.dismiss();

        // toast.loading("Fetching Combo Products...");
        // const comboResponse = await getAllComboProducts();
        // setComboProducts(comboResponse.data.data);
        // toast.dismiss();
      } catch (err) {
        setError("Error fetching products or combo products");
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div>
    <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Combo Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            product.status === "available" && (
              <Card key={product._id} data={product} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComboProduct;
