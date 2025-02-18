import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrderByUserId } from '../services/operations/orderAPI';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const user = useSelector((state) => state.auth.user._id);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderByUserId(user);
        console.log("response in order", response);
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  const handleOrderClick = (e, order) => {
    e.stopPropagation();
    navigate(`/order/${order._id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Order</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-200 hover:cursor-pointer" onClick={(e) => handleOrderClick(e, order)}>
                <td className="py-2 px-4 border-b text-center">
                  <img src={order.products[0].product.images[0]} className='w-20 h-20 object-cover' alt="Product" />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">Rs.{order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-center">{order.status}</td>
                <td className="py-2 px-4 border-b text-center">{order.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;